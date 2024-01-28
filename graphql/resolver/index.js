import { authResolver } from "./auth.js";

const rootResolver = {
    ...authResolver
}

export default rootResolver;