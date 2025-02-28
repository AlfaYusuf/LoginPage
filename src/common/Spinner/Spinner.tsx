import React from 'react';
import salesVibe from "../../Assets/Images/salesVibe.gif"
import { useSelector } from 'react-redux';
import { connect ,useDispatch} from 'react-redux';
import { increment, decrement } from './../../Module/redux/actions';
const Spinner = (props) => {
  //  debugger
   const { SpinLoading ,collapsed} = props; // Access props from connect

    return (
        
        <div className={collapsed ? "spinWidth" : "spinWidth1"}>
            <div className={SpinLoading ? "spin_class2" : "spin_class1"}>
            {SpinLoading && (
          <img src={salesVibe} alt="loading..." height={80} width={80} />
        )}
                {/* If needed, you can uncomment the Antd Spin */}
                {/* <Spin spinning={SpinLoading} tip="Loading..."></Spin> */}
            </div>
         </div> 
    );
};


const mapStateToProps = (state) => {
    return {
      Login: state.Login, // Mapping the Redux state `Login` to a prop
      DarkMode:state.DarkMode,
      SpinLoading:state.SpinLoading
    };
  };
  
  const mapDispatchToProps = {
    increment,
    decrement
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(Spinner);
