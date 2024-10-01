// import { useEffect, useState, startTransition } from 'react';
// import { Link } from 'react-router-dom';
// import { Button } from 'reactstrap';
// import { ProfileType, UserType } from '../../types';
// import { useStateContext } from '../../context/user-context';
// import Spinner from '../Spinner';
import './index.css';
// import FirebaseFirestoreService from '../../services/FirebaseFirestoreService';

const Profile = () => {
  return (
    <div id='profile'>
      <h2>Profile</h2>
      <div className='container profile__container'></div>
    </div>
  );

  // const [profile, setProfile] = useState<ProfileType | null>(null);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const stateContext = useStateContext();
  // const user = stateContext.state.authUser;

  // useEffect(() => {
  //   startTransition(() => {
  //     setIsLoading(true);
  //   });

  //   fetchProfile()
  //     .then(fetchedProfile => {
  //       startTransition(() => {
  //         setProfile(fetchedProfile);
  //       });
  //     })
  //     .catch((error: Error) => {
  //       alert(error.message);
  //       //throw error;
  //     })
  //     .finally(() => {
  //       startTransition(() => {
  //         setIsLoading(false);
  //       });
  //     });
  //   /* eslint-disable react-hooks/exhaustive-deps */
  // }, [user]);

  // const fetchProfile = async (cursorId: string = '') => {
  //   let fetchedProfile: any | undefined;

  //   try {
  //     const document = await FirebaseFirestoreService.readDocument(
  //       'profiles',
  //       (user as UserType).uid,
  //     );
  //     if (document.exists()) {
  //       fetchedProfile = document.data();
  //     } else {
  //       throw new Error('Document does not exist');
  //     }
  //   } catch (error) {
  //     alert((error as Error).message);
  //   }

  //   return fetchedProfile;
  // };

  // if (isLoading) {
  //   return <Spinner />;
  // }

  // return (
  //   <>
  //     <div className='site-section'>
  //       <div className='table-responsive-md'>
  //         <div className='row mb-4'>
  //           <div className='col-md-7'>
  //             <h3 className='heading-21921'>Profile</h3>
  //           </div>
  //         </div>
  //       </div>
  //       <div className='table-responsive-md'>
  //         <table className='table table-striped table-hover'>
  //           <thead className='table-dark'>
  //             {!!profile && (
  //               <tr>
  //                 <th scope='col'>
  //                   {profile.firstName}
  //                   &nbsp;{profile.lastName}
  //                 </th>
  //                 <th scope='col'></th>
  //               </tr>
  //             )}
  //           </thead>
  //           {!!profile && (
  //             <tbody>
  //               <tr>
  //                 <td>Icon</td>
  //                 <td>{profile.icon}</td>
  //               </tr>
  //               <tr>
  //                 <td>Phone Number</td>
  //                 <td>{profile.phoneNumber}</td>
  //               </tr>
  //               <tr>
  //                 <td>Email</td>
  //                 <td>{profile.email}</td>
  //               </tr>
  //               <tr>
  //                 <td>Artist Statement</td>
  //                 <td>{profile.artistStatement}</td>
  //               </tr>
  //             </tbody>
  //           )}
  //         </table>
  //       </div>
  //       <div className='row mb-5'>
  //         <div className='col'>
  //           <div className=''>
  //             <Button className='btn btn-eazybank' tag={Link} to='/dashboard'>
  //               BACK
  //             </Button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );
};

export default Profile;
