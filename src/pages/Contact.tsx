import Button from "@/components/Button"

const Contact = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4 py-12">
            <div className="w-full max-w-2xl bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                    Contact Us
                </h2>
                <form className="space-y-6">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your name"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-1">
                            Message
                        </label>
                        <textarea
                            rows={5}
                            className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Type your message..."
                        ></textarea>
                    </div>
                    <Button
                        type="button"
                        className="w-full dark:bg-blue-600 dark:text-white hover:bg-blue-700 font-semibold py-2 px-4 rounded-lg transition"
                    >
                        Send Message
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default Contact