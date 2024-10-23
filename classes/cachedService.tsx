import { AppStore } from "@/store";

class Cache {
  storeRef: AppStore | undefined = undefined;
}

const CachedService = new Cache();

export default CachedService;
