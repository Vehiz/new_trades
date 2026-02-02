import { useNavigation, Outlet } from 'react-router-dom'

const AccountLayout = () => {
  const navigation = useNavigation()
  const isPageLoading = navigation.state === "loading";
  return (
    <div>
      <section className="">
        {isPageLoading ? <div className="text-[30px]">loading...</div> : <Outlet />}
      </section>
    </div>
  )
}

export default AccountLayout