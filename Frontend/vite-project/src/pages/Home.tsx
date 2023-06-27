import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
import "../style/Home.scss";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
} from "@mui/material";

const Home = () => {
  return (
    <div style={{ marginTop: "50px", color: "#336B87" }}>
      <Typography variant="h4">Welcome to RoundTrip</Typography>
      <br />
      <Carousel className="Example">
        {items.map((item, index) => {
          return (
            <Banner
              item={item}
              key={index}
              contentPosition={item.contentPosition}
            />
          );
        })}
      </Carousel>
      <br />
    </div>
  );
};

type Item = {
  Name: string;
  Caption: string;
  contentPosition: "left" | "right" | "middle";
  Items: { Name: string; Image: string }[];
};

interface BannerProps {
  item: Item;
  contentPosition: "left" | "right" | "middle";
  length?: number;
}

const Banner = (props: BannerProps) => {
  const contentPosition = props.contentPosition
    ? props.contentPosition
    : "left";
  const totalItems: number = props.length ? props.length : 3;
  const mediaLength = totalItems - 1;

  let items = [];
  const content = (
    <Grid item xs={4} key="content">
      <CardContent className="Content">
        <Typography className="Title">{props.item.Name}</Typography>

        <Typography className="Caption">{props.item.Caption}</Typography>

        <Button variant="outlined" className="ViewButton">
          View Now
        </Button>
      </CardContent>
    </Grid>
  );

  for (let i = 0; i < mediaLength; i++) {
    const item = props.item.Items[i];

    const media = (
      <Grid item xs={4} key={item.Name}>
        <CardMedia className="Media" image={item.Image} title={item.Name}>
          <Typography className="MediaCaption">{item.Name}</Typography>
        </CardMedia>
      </Grid>
    );

    items.push(media);
  }

  if (contentPosition === "left") {
    items.unshift(content);
  } else if (contentPosition === "right") {
    items.push(content);
  } else if (contentPosition === "middle") {
    items.splice(items.length / 2, 0, content);
  }

  return (
    <Card raised className="Banner">
      <Grid container spacing={0} className="BannerGrid">
        {items}
      </Grid>
    </Card>
  );
};

const items: Item[] = [
  {
    Name: "Choose your destination",
    Caption: "Search for a country or a city to map",
    contentPosition: "left",
    Items: [
      {
        Name: "Miami, Florida",
        Image:
          "https://www.bahamasairtours.com/wp-content/uploads/2021/06/What-to-do-in-south-beach-miami-florida.jpg",
      },
      {
        Name: "New York City, New York",
        Image:
          "https://www.frommers.com/system/media_items/attachments/000/868/461/s980/Frommers-New-York-City-Getting-Around-1190x768.jpg?1647177178",
      },
    ],
  },
  {
    Name: "Pick what to do",
    Caption: "Add activities from suggestions",
    contentPosition: "middle",
    Items: [
      {
        Name: "Botanical Gardens",
        Image:
          "https://i.guim.co.uk/img/media/c94fc7029cb459ccc6e2a2ff2fdf4d68c80b7baa/0_219_5760_3456/master/5760.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=ad97141ebc2fe9c42a72bdd5128bdaef",
      },
      {
        Name: "Museums",
        Image:
          "https://www.britishmuseum.org/sites/default/files/styles/uncropped_small/public/2019-10/Visiting-Parthenon-gallery-british-museum.jpg?itok=W4b_GL3T",
      },
    ],
  },
  {
    Name: "Choose where to eat",
    Caption: "Add restaurants based on proximity or ratings",
    contentPosition: "right",
    Items: [
      {
        Name: "Pizza",
        Image:
          "https://img.freepik.com/free-photo/top-view-pepperoni-pizza-with-mushroom-sausages-bell-pepper-olive-corn-black-wooden_141793-2158.jpg?w=2000",
      },
      {
        Name: "Sushi",
        Image:
          "https://restaurantclicks.com/wp-content/uploads/2021/06/Omakase-A-Japanese-Dining-Experience-You-Need-To-Try.jpg",
      },
    ],
  },
];

export default Home;
