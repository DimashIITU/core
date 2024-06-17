import { CoursesList } from "@/features/courses-list/pub/courses-list";
import { CreateCourseForm } from "@/features/courses-list/pub/create-course-form";
import { dbClient } from "@/shared/lib/db";

export default async function Home() {
  const courses = await dbClient.course.findMany();
  console.log(courses);

  return (
    <main className="flex min-h-screen flex-col  p-8">
      <CreateCourseForm
        revalidatePagePath={"/"}
        className="max-w-[300px] mb-10"
      />
      <CoursesList revalidatePagePath={"/"} />
    </main>
  );
}
