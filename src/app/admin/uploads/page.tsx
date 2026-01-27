import { getCoursesForSelect } from "./action";
import { UploadForm } from "@/components/admin/UploadForm";
import { FileStack } from "lucide-react";

export default async function UploadPage() {
    const courses = await getCoursesForSelect();

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                    <FileStack className="h-6 w-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Upload Center
                    </h1>
                    <p className="text-gray-500">
                        Add new academic resources to the library.
                    </p>
                </div>
            </div>

            <UploadForm courses={courses} />
        </div>
    );
}
