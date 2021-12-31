import React, { useState, useEffect } from "react";
import ScreenHeading from "../../utilities/ScreenHeading/ScreenHeading";
import ScrollService from "../../utilities/ScrollService";
import Animations from "../../utilities/Animations";
import "./Resume.css";

const Resume = (props) => {
  /* STATES */
  const [selectedBulletIndex, setSelectedBulletIndex] = useState(0);
  const [carousalOffsetStyle, setCarousalOffsetStyle] = useState({});

  let fadeInScreenHandler = (screen) => {
    if (screen.fadeInScreen !== props.id) return;

    Animations.animations.fadeInScreen(props.id);
  };
  const fadeInSubscription =
    ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);

  /* REUSABLE MINOR COMPONENTS */
  const ResumeHeading = (props) => {
    return (
      <div className="resume-heading">
        <div className="resume-main-heading">
          <div className="heading-bullet"></div>
          <span>{props.heading ? props.heading : ""}</span>
          {props.fromDate && props.toDate ? (
            <div className="heading-date">
              {props.fromDate + "-" + props.toDate}
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="resume-sub-heading">
          <span>{props.subHeading ? props.subHeading : ""}</span>
        </div>
        <div className="resume-heading-description">
          <span>{props.description ? props.description : ""}</span>
        </div>
      </div>
    );
  };

  /* STATIC RESUME DATA FOR THE LABELS*/
  const resumeBullets = [
    { label: "Education", logoSrc: "education.svg" },
    { label: "Work History", logoSrc: "work-history.svg" },
    { label: "Skills", logoSrc: "programming-skills.svg" },
    { label: "Continued Education", logoSrc: "projects.svg" },
    { label: "Interests", logoSrc: "interests.svg" },
  ];

  //here we have
  const programmingSkillsDetails = [
    { skill: "Technical Recruiting", ratingPercentage: 90 },
    { skill: "Sourcing", ratingPercentage: 85 },
    { skill: "Management", ratingPercentage: 60 },
    { skill: "Mentoring", ratingPercentage: 79 },
    { skill: "Software Knowledge", ratingPercentage: 80 },
    { skill: "Hardware Knowledge", ratingPercentage: 70 },
    { skill: "Network Infrastructure", ratingPercentage: 70 },
    { skill: "Closing", ratingPercentage: 80 },
    { skill: "Team Work", ratingPercentage: 90 },
  ];

  const projectsDetails = [
    {
      title: "Sourcecon Training",
      duration: { fromDate: "2018", toDate: "Current" },
      description:
        "Sourcecon provides online training, live conventions and challenges to test your skills.",
      subHeading: "I make sure to stay up to date on sourcing techniques",
    },
    {
      title: "LinkedIn Talent Sourcing ",
      duration: { fromDate: "2019", toDate: "2019" },
      description:
        "A certification LinkedIn offers.",
      subHeading:
        "This is a good way to make sure not to fall behind on sourcing abilities",
    },
    {
      title: "Technical Recruiting ",
      duration: { fromDate: "2019", toDate: "2019" },
      description:
        "Technical Recruiting certificate LinkedIn offers",
      subHeading:
        "It's important to always be learning and never forget that you don't know it all.",
    },
  ];

  const resumeDetails = [
    <div className="resume-screen-container" key="education">
      <ResumeHeading
        heading={"University of California Berkeley"}
        subHeading={"CIVIL ENGINEERING"}
        /*
      />
  
      <ResumeHeading 
        heading={"National Youth Service Corps"}
        subHeading={"Ministry Of Science And Technogy. Uyo Akwa Ibom State"}
        fromDate={"2019"}
        toDate={"2020"}
      />
      <ResumeHeading
        heading={"High School "}
        subHeading={"Command Secondary School Mbiri"}
        fromDate={"2007"}
        toDate={"2012"} */
      /> 
    </div>, 

    /* WORK EXPERIENCE */
    <div className="resume-screen-container" key="work-experience">
      <div className="experience-container">
        <ResumeHeading
          heading={"SiTime"}
          subHeading={"Senior Technical Recruiter"}
          fromDate={"2021"}
          toDate={"Present"}
        />
        
        <div className="experience-description">
        <span className="resume-description-text">
           - Global full lifecycle recruiter for semiconductor company in silicon valley. Hiring the best CMOS and MEMS talent, from Engineers to VP's.
          </span>
          
          <span className="resume-description-text">
            - Managed our recruiting coordinator and worked closely with her to help candidates move quickly through the 
              interviewing process, without delays.
          </span>
          <br />
          <span className="resume-description-text">
            - Coach and befriend candidates to help them make the best decision for their current and future needs.{" "}
          </span>
          <br />
          <span className="resume-description-text">
            - Push myself to learn new technologies and write code in all flavors.
          </span>
          <br />
          </div>
      </div>
    </div>,

    /* PROGRAMMING SKILLS */
    <div
      className="resume-screen-container programming-skills-container"
      key="programming-skills"
    >
      {programmingSkillsDetails.map((skill, index) => (
        <div className="skill-parent" key={index}>
          <div className="heading-bullet"></div>
          <span>{skill.skill}</span>
          <div className="skill-percentage">
            <div
              style={{ width: skill.ratingPercentage + "%" }}
              className="active-percentage-bar"
            ></div>
          </div>
        </div>
      ))}
    </div>,

    

    /* PROJECTS */
    <div className="resume-screen-container" key="projects">
      {projectsDetails.map((projectsDetails, index) => (
        <ResumeHeading
          key={index}
          heading={projectsDetails.title}
          subHeading={projectsDetails.subHeading}
          description={projectsDetails.description}
          fromDate={projectsDetails.duration.fromDate}
          toDate={projectsDetails.duration.toDate}
        />
      ))}
    </div>,

    /* Interests */
    <div className="resume-screen-container" key="interests">
      <ResumeHeading
        heading="Writing Code"
        description="Apart from being a tech enthusiast I love to write code and challenge myself to learn new things. I'm a full-stack developer and I also love to write Android and IoS apps." 
      />
      <ResumeHeading
        heading="Home Lab"
        description="I love working in my home labe and building on my home network infrastructure. I have an enterprise firewall and I run a tier 1 hypervisor. Hacking is my passion and there are endless things to learn and try."
      />
      <ResumeHeading
        heading="Music"
        description="I've been playing electric bass for several years and I have also taught jazz lessson. I love writing and playing a veriety of styles. Playing my bass is my zen place and it's very therapeutic"
      />
    </div>,
  ];

  const handleCarousal = (index) => {
    let offsetHeight = 360;

    let newCarousalOffset = {
      style: { transform: "translateY(" + index * offsetHeight * -1 + "px)" },
    };

    setCarousalOffsetStyle(newCarousalOffset);
    setSelectedBulletIndex(index);
  };

  const getBullets = () => {
    return resumeBullets.map((bullet, index) => (
      <div
        onClick={() => handleCarousal(index)}
        className={
          index === selectedBulletIndex ? "bullet selected-bullet" : "bullet"
        }
        key={index}
      >
        <img
          className="bullet-logo"
          src={require(`../../assets/Resume/${bullet.logoSrc}`).default}
          alt="B"
        />
        <span className="bullet-label">{bullet.label}</span>
      </div>
    ));
  };

  const getResumeScreens = () => {
    return (
      <div
        style={carousalOffsetStyle.style}
        className="resume-details-carousal"
      >
        {resumeDetails.map((ResumeDetail) => ResumeDetail)}
      </div>
    );
  };

  useEffect(() => {
    return () => {
      /* UNSUBSCRIBE THE SUBSCRIPTIONS */
      fadeInSubscription.unsubscribe();
    };
  }, [fadeInSubscription]);

  return (
    <div
      className="resume-container screen-container fade-in"
      id={props.id || ""}
    >
      <div className="resume-content">
        <ScreenHeading title={"Resume"} subHeading={"My formal Bio Details"} />
        <div className="resume-card">
          <div className="resume-bullets">
            <div className="bullet-container">
              <div className="bullet-icons"></div>
              <div className="bullets">{getBullets()}</div>
            </div>
          </div>

          <div className="resume-bullet-details">{getResumeScreens()}</div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
