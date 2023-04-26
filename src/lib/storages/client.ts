// eslint-disable-next-line import/no-extraneous-dependencies
import localforage from 'localforage'

import { UIStrings } from '~/lib/i18n/resources'
import { AppSettings } from '~/lib/settings/enums'

class ClientStorageService {
  private static storageInstance: LocalForage | undefined

  private static storageConfig: LocalForageOptions = {
    ...AppSettings,
    storeName: `${AppSettings.name}_${AppSettings.version}`,
    driver: localforage.INDEXEDDB,
    description: `Local store for "${UIStrings.title}" application data`
  }

  public get Storage(): LocalForage {
    if (ClientStorageService.storageInstance === undefined) {
      ClientStorageService.storageInstance = localforage.createInstance({
        ...ClientStorageService.storageConfig
      })
    }
    return ClientStorageService.storageInstance
  }
}

export { ClientStorageService }
