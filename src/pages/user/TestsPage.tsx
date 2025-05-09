import VisionTest from "./tests/VisionTest";
import WrittenTest from "./tests/WrittenTest";
import PracticalTest from "./tests/PracticalTest";

const TestsPage = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <VisionTest />
                <WrittenTest />
                <PracticalTest />
            </div>
        </div>
    );
};

export default TestsPage;
