import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

const options = {
  mv: "மு.வரதராசன்",
  sp: "சாலமன் பாப்பையா",
  mk: "மு.கருணாநிதி",
};

function Kural({ kural, tamilExp }) {
  console.log(tamilExp);
  return (
    <Box m={2} pt={3}>
      <Card elevation={8}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {`குறள் ${kural.Number}:`}
          </Typography>
          <Typography variant="h5" component="div">
            {kural.Line1}
            <br />
            {kural.Line2}
          </Typography>
          {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {kural.couplet}
          </Typography> */}
          <Typography variant="body2">
            {Boolean(tamilExp.length) && "விளக்கம்:"}
            {tamilExp.map((exp) => (
              <>
                <br />
                <Chip label={options[exp]} />
                {kural[exp]}
              </>
            ))}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Kural;
