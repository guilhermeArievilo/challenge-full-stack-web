import { Module } from "@nestjs/common";
import { StudentDatabaseModule } from "./db/studentDatabase.module";
import { StudentHttpModule } from "./http/studentHttp.module";

@Module({
  imports: [StudentDatabaseModule, StudentHttpModule],
})
export class StudentModule {}
