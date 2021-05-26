import { FC } from "react"

const PageContainer: FC = ({ children }) => {
  return <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-8 pb-32">{children}</div>
}

export default PageContainer
