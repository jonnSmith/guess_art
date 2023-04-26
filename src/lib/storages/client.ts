// eslint-disable-next-line import/no-extraneous-dependencies
import localforage from 'localforage'

import { UIStrings } from '~/lib/i18n/resources'
import { AppSettings, ParseSettings } from '~/lib/settings/enums'

class ClientStorageService {
  private settings = { ...ParseSettings }

  private static storageInstance: LocalForage | undefined

  private static storageConfig: LocalForageOptions = {
    ...AppSettings,
    storeName: Object.values({ ...AppSettings }).join(),
    driver: localforage.INDEXEDDB,
    description: `Local store for "${UIStrings.title}" application data`
  }

  public static get Storage(): LocalForage {
    if (ClientStorageService.storageInstance === undefined) {
      ClientStorageService.storageInstance = localforage.createInstance({
        ...ClientStorageService.storageConfig
      })
    }
    return ClientStorageService.storageInstance
  }
}

export { ClientStorageService }
