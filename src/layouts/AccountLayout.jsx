import {useNavigation, Outlet} from 'react-router-dom'

const AccountLayout = () => {
      const navigation = useNavigation()
console.log(navigation)
    const isPageLoading = navigation.state === "loading";
    console.log(isPageLoading, "loading")
  return (
    <div>
        <section className="">
        {isPageLoading ? <div className="text-[30px]">loading...</div> : <Outlet />}
      </section>
    </div>
  )
}

export default AccountLayout