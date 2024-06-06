import React from "react";
import Project from "./Project";
import Item from "./Item";
import { Link } from "@mui/material";

function Music() {
  return (
    <Project title="music">
      <Item title="Continuo" link="https://continuomusic.org/">
        President of Continuo from 2021-2023. Created new executive team
        structure and partnerships, including with Harvard Office of the Arts,
        and oversaw community performances.
      </Item>
      <Item title="Oboe" link="">
        I play the oboe, sometimes in the{" "}
        <Link href="https://www.harvardradcliffeorchestra.org/">
          Harvard-Radcliffe Orchestra
        </Link>
        , sometimes with Continuo, sometimes for the{" "}
        <Link href="https://www.instagram.com/p/CgksLsPpUlN/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==">
          Mexican Ambassador
        </Link>{" "}
        to the US. Reed squeaker of 12 years!
      </Item>
    </Project>
  );
}

export default Music;
