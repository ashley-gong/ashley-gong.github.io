import React from "react";
import Project from "./Project";
import Item from "./Item";
import { Link, Typography } from "@mui/material";

// import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
// const supabase = createClient(
//   process.env.REACT_APP_SUPABASE_URL,
//   process.env.REACT_APP_SUPABASE_ANON_KEY
// );

// const { data, error } = await supabase.from("about").select("*");

// console.log(data);

export function Coding() {
  // if (error) {
  //   return <Typography variant="h3">{error.message}</Typography>;
  // }
  return (
    <Project title="coding highlights">
      <Typography variant="body2" sx={{ pb: 2 }}>
        Check out my <Link href="https://github.com/ashley-gong">GitHub</Link>!
      </Typography>
      <Item title="Hedera" link="https://hederaproject.org/">
        See above.
      </Item>
      <Item title="AWS Security Group Remediation" link="https://github.com/ashley-gong/aws-security-group-rule-remediation">
        Built and unit-tested AWS EC2 security group rule remediation script in Python using Boto3 SDK.
      </Item>
      <Item title="Questable" link="https://questable.vercel.app/">
        Designed and implemented theme and UI for{" "}
        <Link href="https://socialgood.hcs.harvard.edu/">
          Harvard Tech for Social Good's
        </Link>{" "}
        Questable, a K-6 learning management system that gamifies the classroom
        experience. Also integrated Google Classroom API and developed workflow
        for teachers to import tasks and mass approve student coursework.
      </Item>
      <Item
        title="Mini Shell"
        link="https://cs61.seas.harvard.edu/site/2022/Shell/#gsc.tab=0"
      >
        Using C++, built subset of Bash shell. Parsed simple commands using BNF
        grammar, added more complex syntax like command lists and conditionals,
        implemented pipeline and redirecting functionality, and finally the
        deceptively simple “cd” command.
      </Item>
      <Item title="Harvard Open Data Project" link="https://www.hodp.org/">
        Current Technology Director of HODP. Maintained and improved website UI
        with React and Sanity,{" "}
        <Link href="https://www.hodp.org/blog/where-do-hodp-s-accents-come-from">
          experimented with Tableau
        </Link>
        , and facilitated club-wide data science initiatives. Working on
        building student-run wiki (coming soon!).
      </Item>
      <Item title="Datamatch" link="https://datamatch.me/">
        Incorporated feature of encoding short answer survey responses using
        SBERT ML Sentence Transformers into match-matching algorithm used by
        over 50,000 students nationwide.{" "}
      </Item>
      <Item
        title="Key Tweet Graphic Generator"
        link="https://github.com/ashley-gong/Key-Tweet-Generator"
      >
        Simple Flask web app developed to automate Twitter graphics in Echelon
        Insights client reports. Never deployed and sadly obselete with the new
        API restrictions.{" "}
      </Item>
      <Item title="Other" link="">
        Created this website because I felt like it. Built MiniML, a mini
        version of an OCaml interpreter using dynamic and lexical semantics.
        Coded{" "}
        <Link href="https://github.com/ashley-gong/cs50-finalproject">
          Reed Time
        </Link>
        , a web application to assist oboists in tracking their reedmaking
        productivity.
      </Item>
    </Project>
  );
}

export default Coding;
