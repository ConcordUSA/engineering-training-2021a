import React, { useContext, useEffect, useMemo, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { IEvent, capitalize } from "../models/event";
import UsersService from "../services/usersService";
import { AppDependencies, AppDependenciesContext } from "../appDependencies";
import EventsService, { EventsPerCategory } from "../services/eventsService";
import { User } from "../models/user";
import Events from "./Events";
import Grid from "@material-ui/core/Grid";
import AppTheme from "../styles/theme";
import { useRecoilState } from "recoil";
import { searchTerm } from "../store";
import { colors } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%",
      width: "100%",
      backgroundColor: AppTheme.background,
      backgroundSize: "cover",
    },
    gridDiv: {
      backgroundColor: AppTheme.background,
      display: "flex",
      flexFlow: "row wrap",
      justifyContent: "left",
      alignContent: "flex-start",
      paddingTop: "1rem",
      paddingLeft: "2em",
    },
    categoryHeader: {
      fontSize: "2.2em",
      paddingLeft: "8px",
      color: colors.grey[500],
      fontWeight: 500,
    },
  })
);

const searchFilter = async (search: string, events: EventsPerCategory[]) => {
  let res: EventsPerCategory[] = [];
  events.forEach((eventCategory: EventsPerCategory) => {
    const regex = new RegExp(`^${search}`, "gi");
    eventCategory.items = eventCategory.items.filter((event: IEvent) => {
      let i = 0;
      const keyWords = event.topic.split(" ");
      while (keyWords[i]) {
        if (keyWords[i++].match(regex)) return true;
      }
      return false;
    });
    res.push(eventCategory);
  });
  return res;
};

export default function EventListView() {
  const classes = useStyles();
  const [user, setUser] = useState<User>();
  const [events, setEvents] = useState<EventsPerCategory[]>([]);
  const [searchTermState] = useRecoilState(searchTerm);
  const { db, auth }: AppDependencies = useContext(AppDependenciesContext);
  const userService = useMemo(() => new UsersService(db, auth), [db, auth]);
  const eventService = useMemo(() => new EventsService(db), [db]);

  useEffect(() => {
    userService.getUser(auth.currentUser?.uid).then((user: User) => {
      setUser({ ...user });
    });
  }, [userService, auth.currentUser, searchTermState]);

  useEffect(() => {
    if (user?.interestedCategories) {
      eventService
        .getAllEvents(user.interestedCategories)
        .then(async (eventList: EventsPerCategory[]) => {
          setEvents(
            searchTermState
              ? await searchFilter(searchTermState, eventList)
              : eventList
          );
        });
    }
  }, [eventService, user, searchTermState]);

  return (
    <React.Fragment>
      <div className={classes.root}>
        {events?.map((categoryList: EventsPerCategory) => (
          <div className={classes.gridDiv} key={categoryList.category}>
            {categoryList.items.length > 0 && (
              <h1 className={classes.categoryHeader}>
                {capitalize(categoryList.category)}
              </h1>
            )}
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              {categoryList?.items?.map((event: IEvent | any) => (
                <Events event={event} key={event.topic} />
              ))}
            </Grid>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}
