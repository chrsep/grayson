import { FC } from "react"

const PageContainer: FC = ({ children }) => {
  return <div className="sm:px-6 lg:px-8 pt-8 pb-32 mx-auto max-w-7xl">{children}</div>
}

export default PageContainer
