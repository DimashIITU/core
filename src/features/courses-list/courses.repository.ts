import { dbClient } from "@/shared/lib/db"
import { cache } from "react"

class CoursesRepository {
    getCoursesList = cache((): Promise<CourseListElement[]> => {
        return dbClient.course.findMany()
    })
    createCourseElement =(command: CreateCourseListElementCommand) => {
        return dbClient.course.create({
            data: command
        })
    }
    deleteCourseElement = (command: DeleteCourseListElementCommand) => {
        return dbClient.course.delete({
            where: {
                id: command.id
            }
        })
    } 
}

export const coursesRepository = new CoursesRepository()