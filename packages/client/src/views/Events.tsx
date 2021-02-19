import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { useHistory } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Paper, Button, Container } from "@material-ui/core";
import AppTheme from "../styles/theme";
import routes from "../constants/routes";
import { selectedEvent } from "../store";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    container: {
      margin: "0px 5px 5px 0px",
      padding: "5px",
    },
    event: {
      width: "29%",
      height: "30%",
    },
    eventsImgDiv: {
      width: "40%",
      display: "flex",
      alignItems: "center",
      justifyContent: "left",
    },
    eventPhoto: {
      height: "92%",
      width: "92%",
      margin: "4px 0px 4px 7px",
      borderRadius: 4,
    },
    eventPaper: {
      display: "flex",
      flexWrap: "wrap",
      height: "170px",
      marginBottom: "10px",
      "&:hover": {
        backgroundColor: AppTheme.background,
      },
    },
    eventDetailsDiv: {
      display: "flex",
      width: "60%",
      flexWrap: "wrap",
    },
    eventTitle: {
      margin: 0,
      fontSize: "1.5rem",
    },
    eventParagraph: {
      display: "-webkit-box",
      "-webkit-line-clamp": 3,
      "-webkit-box-orient": "vertical",
      padding: 0,
      margin: 0,
    },

    eventDateDiv: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    eventParaDiv: {
      marginTop: "10px",
      width: "100%",
      overflow: "hidden",
      height: "3.6em",
    },
    eventDate: {
      margin: 0,
      color: AppTheme.primary,
    },

    registerBtn: {
      marginRight: "15px",
      color: AppTheme.primaryText,
      backgroundColor: AppTheme.primary,
      "&:hover": {
        backgroundColor: AppTheme.secondary,
      },
    },
  })
);

export default function Events(props) {
  const classes = useStyles();
  const history = useHistory();
  const [elevationState, setElevationState] = useState(1);
  const onMouseEnter = () => {
    setElevationState(10);
  };
  const onMouseLeave = () => {
    setElevationState(1);
  };
  const [, setSelectedEventState] = useRecoilState(selectedEvent);

  const onClick = (e): any => {
    setSelectedEventState(e);
    history.push(routes.EVENT_DETAILS_URL + e.id);
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Container
          maxWidth="xs"
          className={classes.container}
          key={props.event.id}
        >
          <Paper
            className={classes.eventPaper}
            elevation={elevationState}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={() => onClick(props.event)}
          >
            <div className={classes.eventsImgDiv}>
              <img
                src={props.event.image}
                className={classes.eventPhoto}
                alt="Publicity for upcoming event"
              />
            </div>
            <div className={classes.eventDetailsDiv}>
              <div>
                <h1 className={classes.eventTitle}>{props.event.topic}</h1>
                <div className={classes.eventParaDiv}>
                  <p className={classes.eventParagraph}>
                    {props.event.description}
                  </p>
                </div>
              </div>
              <div className={classes.eventDateDiv}>
                <p className={classes.eventDate}>
                  {new Date(
                    props.event.startTime.seconds * 1000
                  ).toDateString()}
                </p>
                <Button variant="contained" className={classes.registerBtn}>
                  register
                </Button>
              </div>
            </div>
          </Paper>
        </Container>
      </div>
    </React.Fragment>
  );
}
