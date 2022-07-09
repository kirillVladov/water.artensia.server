import { ConfigService } from "@nestjs/config";
import { TypegooseModuleOptions } from "nestjs-typegoose";

export const getMongoConfig = async (configSevice: ConfigService) : Promise<TypegooseModuleOptions> => ({
    uri: configSevice.get('MONGO_URI')
})