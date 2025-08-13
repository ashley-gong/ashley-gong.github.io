import React from "react";
import Project from "./Project";
import Item from "./Item";
import { Link } from "@mui/material";

function Music() {
  return (
    <Project title="music">
      <Item title="Continuo" link="https://continuoboston.wixsite.com/music">
        President of Continuo from 2021-2023. Created new executive team
        structure and partnerships, including with Harvard Office of the Arts,
        and oversaw community performances.
      </Item>
      <Item title="Oboe" link="">
        I play the oboe, previously in the{" "}
        <Link href="https://www.harvardradcliffeorchestra.org/">
          Harvard-Radcliffe Orchestra
        </Link>
        , previously with Continuo, once for the{" "}
        <Link href="https://www.instagram.com/p/CgksLsPpUlN/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==">
          Mexican Ambassador
        </Link>{" "}
        to the US!
      </Item>
    </Project>
  );
}

export default Music;
