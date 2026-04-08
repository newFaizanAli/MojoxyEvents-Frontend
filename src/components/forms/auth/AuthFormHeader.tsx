

const AuthFormHeader = ({ title, desc }: {
    title: string,
    desc: string
}) => {
    return (
        <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm sm:text-title-md">
                {title}
            </h1>
            <p className="text-sm text-gray-500">
                {desc}
            </p>
        </div>
    )
}

export default AuthFormHeader
