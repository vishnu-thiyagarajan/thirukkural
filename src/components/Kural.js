import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import React from "react";

const options = {
  mv: "மு.வரதராசன்",
  sp: "சாலமன் பாப்பையா",
  mk: "மு.கருணாநிதி",
};

function Kural({ kural, Exp, eng }) {
  return (
    <Box m={2} pt={3}>
      <Card elevation={8}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {eng ? `Couplet ${kural.Number}:` : `குறள் ${kural.Number}:`}
          </Typography>
          <Typography variant="h5" component="div">
            {eng ? kural.transliteration1 : kural.Line1}
            <br />
            {eng ? kural.transliteration2 : kural.Line2}
          </Typography>
          {eng && <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {kural.couplet}
          </Typography>}
          <Typography component={'span'} variant="body2">
            {eng && <>{"Translation"} <br /> {kural["Translation"]}<br /></>}
            {Boolean(Exp.length) && eng ? <>{"Explanation"}<br /></> : "விளக்கம்:"}
            {eng && kural["explanation"]}
            {!eng && Exp.map((exp, index) => (
              <div key={index}>
                {<Chip label={options[exp]} />}
                {kural[exp]}
              </div>
            ))}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Kural;
