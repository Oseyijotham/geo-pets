import css from './Home.module.css';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectError,
  selectIsLoading,
  selectedContact,
} from '../../redux/AppRedux/selectors';
import { selectUser } from '../../redux/AuthRedux/selectors';
import { updateAvatar } from '../../redux/AuthRedux/operations';
import svg from '../SharedLayout/icons.svg';
import icon from './list2.svg';
import Scheduling from './SchedulerCorper.jpg';
import SchedulingDensity from './SchedulerCorper@2x.jpg';
import Sorting from './SortingCorper.jpg';
import SortingDensity from './SortingCorper@2x.jpg';
import DataVisualization from './Data Visualization Corper.jpg';
import DataVisualizationDensity from './Data Visualization Corper@2x.jpg';
import { useMediaQuery } from 'react-responsive';
import { useRef } from 'react';




export const Home = () => {
  const myRef = useRef();
  const sectionRef = useRef(null);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const myUser = useSelector(selectUser);
  const myContact = useSelector(selectedContact);
  const [isOneHovered, setIsOneHovered] = useState(false);
  const [isTwoHovered, setIsTwoHovered] = useState(false);
  const [isThreeHovered, setIsThreeHovered] = useState(false);
  const isTablet = useMediaQuery({ query: '(min-width: 768px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

   const scrollToSection = () => {
     sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
   };

  const handleImageChange = e => {
    console.log("fert");
    let file = e.target.files[0];
    //dispatch(updateAvatar({ avatar: file }));
    console.log({ avatar: file });
    if (file) {
      dispatch(updateAvatar({ avatar: file })); // Store the file under the key "avatar"
    }
    myRef.current.value = ""
  };

  useEffect(() => {
    //dispatch(getUser());
  }, [myContact, dispatch]);
  return (
    <div className={css.homeDisplay}>
      <div>
        <div className={css.homeDisplayIntro}>
          <div className={css.homeIconWrapper}>
            <img src={icon} alt="icon" className={css.homeIcon} />
          </div>
          <span>
            <span className={css.homeDisplayTitle}>
              Welcome,{' '}
              <span className={css.homeDisplayTitlePart}>
                <i>{myUser.firstname}</i>
              </span>
            </span>
            <span className={css.homeDisplaySlogan}>
              <i>
                Here at Airboxify! We provide an all-in-one platform designed to
                help your business streamline its operations. From scheduling
                appointments and events to data visualization, our cloud-based
                SaaS solution simplifies your workflow, keeping your business
                efficient and growing.
              </i>
            </span>
            <span className={css.homeDisplaySloganMobile}>
              <i>Stylishly streamline your businesses operations</i>
            </span>
          </span>
          <div className={css.homeIconWrapper}>
            <img src={icon} alt="icon" className={css.homeIcon} />
          </div>
        </div>
      </div>

      <button onClick={scrollToSection} className={css.homeLink}>
        View Admin Dashboard
      </button>

      <div className={css.hero}>
        <div className={css.offersLabelWrapper}>
          <div className={css.offersLabel}>We offer</div>
        </div>

        <div className={css.offersWrapper}>
          <div
            className={css.frame}
            onMouseEnter={() => {
              setIsOneHovered(true);
            }}
            onMouseLeave={() => {
              setIsOneHovered(false);
            }}
            style={{
              transform: `
    ${isTwoHovered && isTablet ? 'translateY(105%)' : 'translateY(0)'}
    ${isThreeHovered && isTablet ? 'translateX(-30%)' : 'translateX(0)'}
  `,
              boxShadow: `
              ${
                isOneHovered
                  ? 'inset 0 0 50px 30px #9225ff'
                  : 'inset 0 0 10px 5px  #9225ff'
              }
              `,
            }}
          >
            <div
              key="townMayor"
              className={css.movieItem}
              onClick={() => {
                setIsOneHovered(false);
              }}
            >
              <Link to="/sharedLayout/sheduler" className={css.movieInfo}>
                <div className={css.catOverlay}>
                  <img
                    className={css.movieImage}
                    srcSet={`${Scheduling} 1x, ${SchedulingDensity} 2x`}
                    src={Scheduling} // Fallback
                    alt="Scheduling"
                  />
                  <p className={css.catWardDescription}>
                    <span className={css.catWardDescriptionbackground}>
                      Book smarter, not harder.
                    </span>
                  </p>
                </div>
                <span className={css.movieName}>
                  <span className={css.wardName}>Scheduling</span>
                </span>
              </Link>
            </div>
          </div>

          <div
            className={css.frame}
            onMouseEnter={() => {
              setIsTwoHovered(true);
            }}
            onMouseLeave={() => {
              setIsTwoHovered(false);
            }}
            style={{
              transform: `
    ${isOneHovered && isTablet ? 'translateY(105%)' : 'translateY(0)'}
    ${isThreeHovered && isTablet ? 'translateX(30%)' : 'translateX(0)'}
  `,
              boxShadow: `
              ${
                isTwoHovered
                  ? 'inset 0 0 50px 30px #9225ff'
                  : 'inset 0 0 10px 5px  #9225ff'
              }
              `,
            }}
          >
            <div
              key="townLibrarian"
              className={css.movieItem}
              onClick={() => {
                setIsTwoHovered(false);
              }}
            >
              <Link to="/sharedLayout/sorting" className={css.movieInfo}>
                <div className={css.catOverlay}>
                  <img
                    className={css.movieImage}
                    srcSet={`${Sorting} 1x, ${SortingDensity} 2x`}
                    src={Sorting} // Fallback
                    alt="Sorting"
                  />
                  <p className={css.catWardDescription}>
                    <span className={css.catWardDescriptionbackground}>
                      From messy to managed in a click
                    </span>
                  </p>
                </div>
                <span className={css.movieName}>
                  <span className={css.wardName}>Sorting</span>
                </span>
              </Link>
            </div>
          </div>

          <div
            className={css.frame}
            onMouseEnter={() => {
              setIsThreeHovered(true);
            }}
            onMouseLeave={() => {
              setIsThreeHovered(false);
            }}
            style={{
              transform: `
      ${isOneHovered && isTablet ? 'translateX(-52%)' : 'translateX(0)'}
      ${isTwoHovered && isTablet ? 'translateX(52%)' : 'translateX(0)'}
    `,
              boxShadow: `
              ${
                isThreeHovered
                  ? 'inset 0 0 50px 30px #9225ff'
                  : 'inset 0 0 10px 5px  #9225ff'
              }
              `,
            }}
          >
            <div
              key="townLibrarian"
              className={css.movieItem}
              onClick={() => {
                setIsTwoHovered(false);
              }}
            >
              <Link to="/sharedLayout/profile" className={css.movieInfo}>
                <div className={css.catOverlay}>
                  <img
                    className={css.movieImage}
                    srcSet={`${DataVisualization} 1x, ${DataVisualizationDensity} 2x`}
                    src={DataVisualization} // Fallback
                    alt="DataVisualization"
                  />
                  <p className={css.catWardDescription}>
                    <span className={css.catWardDescriptionbackground}>
                      Get your insights at a glance
                    </span>
                  </p>
                </div>
                <span className={css.movieName}>
                  <span className={css.wardName}>Data Visualization</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {isLoading && !error && <div>Please wait...</div>}
      {error && <div>There was an error</div>}

      <div className={css.detailsSection} ref={sectionRef}>
        <h2 className={css.detailsSectionTitle}>ADMIN DASHBOARD</h2>
        <div className={css.detailsImageWrapper}>
          <img
            className={css.detailsImage}
            src={`${myUser.avatarURL}`}
            alt="User"
          />
        </div>
        <input
          className={css.detailsImageButton}
          type="file"
          accept="image/*"
          name="avatar"
          ref={myRef}
          onChange={handleImageChange}
          id="2"
        />
        <label className={css.detailsImageInput} htmlFor="2">
          Update Picture +
        </label>
        <ul className={css.detailsWrapper}>
          <li className={css.detailsItem}>
            <span className={css.detailsCover}>
              <span className={css.details}>First Name:-</span>{' '}
              <span className={css.detailsVal}>
                <i className={css.detail}>{myUser.firstname}</i>
              </span>
            </span>
          </li>
          <li className={css.detailsItem}>
            <span className={css.detailsCover}>
              <span className={css.details}>Last Name:-</span>{' '}
              <span className={css.detailsVal}>
                <i className={css.detail}>{myUser.lastname}</i>
              </span>
            </span>
          </li>
          <li className={css.detailsItem}>
            <span className={css.detailsCover}>
              <span className={css.details}>Email:-</span>{' '}
              <span className={css.detailsVal}>
                <i className={css.detail}>{myUser.email}</i>
              </span>
            </span>
          </li>
          <li className={css.detailsItem}>
            <span className={css.detailsCover}>
              <span className={css.details}>Phone Number:-</span>{' '}
              <span className={css.detailsValPhone}>
                <i className={css.detail}>{myUser.phone}</i>
              </span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Home;