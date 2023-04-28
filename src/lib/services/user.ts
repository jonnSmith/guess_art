import { debounce, pick } from 'underscore'

import type {
  ErrorMessage,
  UserDBData,
  UserRecordData,
  UserRecordFields,
  UserRequest,
  UsersRecordsData,
  UserStateData
} from '~/lib/contracts/types'
import { ConsoleLogger } from '~/lib/logger'
import {
  LocalStateSetup,
  NextApiLayers,
  UserDBRecord
} from '~/lib/settings/enums'
import { ClientStorageService } from '~/lib/storages/client'
import { ServerStorageService } from '~/lib/storages/server'
import { defaultUserState } from '~/ui/settings/constants'

class UserService {
  private static clientStorage: ClientStorageService

  private static serverStorage: ServerStorageService

  private Logger: ConsoleLogger

  constructor() {
    this.Logger = new ConsoleLogger(['debug', this.constructor.name.toString()])
  }

  get LocalDB() {
    if (UserService.clientStorage === undefined) {
      UserService.clientStorage = new ClientStorageService()
    }
    return UserService.clientStorage
  }

  get ServerDB() {
    if (UserService.serverStorage === undefined) {
      UserService.serverStorage = new ServerStorageService()
    }
    return UserService.serverStorage
  }

  updateUserState = debounce(
    async (state: UserStateData) => {
      const update = { ...state, step: state.step + 1 }
      await this.LocalDB.Storage.setItem<UserStateData>(
        LocalStateSetup.userStateKey,
        update
      )
      return { ...update }
    },
    1,
    true
  )

  requestUserState = debounce(
    async () => {
      const state = await this.LocalDB.Storage.getItem<UserStateData>(
        LocalStateSetup.userStateKey
      )
      if (state?.score === undefined) {
        return { ...defaultUserState }
      }
      return { ...state }
    },
    1,
    true
  )

  async setUserScore(user: UserStateData): Promise<UserStateData> {
    let userUpdated: UserStateData
    let update = { ...user }
    if (user?.id === undefined) {
      const record = await this.ServerDB.getUser({ username: update?.username })
      if (record?.id === undefined) {
        userUpdated = await this.ServerDB.insertUser({ ...user })
        return userUpdated
      }
      update = { ...update, ...record }
    }
    userUpdated = await this.ServerDB.updateUser({ ...update })
    return userUpdated
  }

  async getUsersData(): Promise<Array<UserRecordData>> {
    const users = await this.ServerDB.getUsers()
    return users.map((user: UserDBData) => {
      return {
        ...pick<UserDBData, UserRecordFields>(
          user,
          Object.keys({ ...UserDBRecord }) as Array<UserRecordFields>
        )
      }
    })
  }

  async getUserData(params: UserRequest): Promise<UserStateData> {
    const user = await this.ServerDB.getUser({ ...params })
    if (user === undefined) {
      throw new Error('USER WAS NOT FOUNDED, CANCELLED')
    }
    return { ...user }
  }

  sendUserData = debounce(
    async (user: UserStateData): Promise<UserStateData | ErrorMessage> => {
      const userRequest = await fetch(
        `/${NextApiLayers.root}/${NextApiLayers.users}/${user.username}`,
        {
          method: 'POST',
          body: JSON.stringify({ ...user })
        }
      )
      const result = await userRequest.json()
      if (result?.id) {
        await this.LocalDB.Storage.setItem<UserStateData>(
          LocalStateSetup.userStateKey,
          result
        )
      }
      return { ...result }
    },
    1,
    true
  )

  queryUserData = debounce(
    async (username: string): Promise<UserStateData | ErrorMessage> => {
      const userRequest = await fetch(
        `/${NextApiLayers.root}/${NextApiLayers.users}/${username}`
      )
      const result = await userRequest.json()
      return { ...result }
    },
    1,
    true
  )

  queryUsersData = debounce(
    async (): Promise<UsersRecordsData | ErrorMessage> => {
      const usersRequest = await fetch(
        `/${NextApiLayers.root}/${NextApiLayers.users}`
      )
      const result = await usersRequest.json()
      return { ...result }
    },
    1,
    true
  )
}

const User = new UserService()
export { User }
