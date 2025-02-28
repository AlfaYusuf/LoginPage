// // import { Spin } from 'antd';
// import { observer } from 'mobx-react';
// import React from 'react';
// import { LoginStoreCreation } from '../../Modules/General/Login/LoginStore.store';
// import skubiq_loader from './../../Assets/Images/skubiq_loader.gif';

// @observer
// export class SpinnerLogin extends React.Component<any> {
//     render() {
//         ////// debugger
//         const {  spin_loading } = LoginStoreCreation;
//         return (
//             <div className={spin_loading ? "spin_class3" : "spin_class1"}>
//                 <img src={skubiq_loader} alt="loading..." height={80} width={80}/>
//                  {/* <Spin spinning={spin_loading}  tip="Loading..."></Spin> */}
//             </div>
//         )
//     }
// }