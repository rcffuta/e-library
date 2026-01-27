import { getCourses } from "./action";
import { CourseList } from "@/components/admin/CourseList";
import { AddCourseModal } from "@/components/admin/AddCourseModal";

export default async function CoursesPage() {
    // Fetch all courses on the server
    const courses = await getCourses();

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Manage Courses
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Create, edit, or remove academic courses.
                    </p>
                </div>

                {/* Actions */}
                <div>
                    <AddCourseModal />
                </div>
            </div>

            {/* Main Content */}
            <CourseList courses={courses} />
        </div>
    );
}
