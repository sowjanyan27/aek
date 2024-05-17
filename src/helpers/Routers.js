import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";

function withRouter(Component) {

  function ComponentWithRouterProp(props) {
    console.warn("++props", props)
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    let search = useSearchParams();
    console.log('test')
    return (
      <Component
        {...props}
        router={{ location, navigate, params, search }}
      />
    );
  }

  return ComponentWithRouterProp;
}
export default withRouter





//   this.props.router.navigate(`/home?username=${this.state.username}`); // if u need to pass parameters use these for navigating 