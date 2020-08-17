import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 200,
  },
});



const HoverSymbol = (props) => {
    const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea style={{zIndex: "1000"}}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="90"
          image={props.image.logo}
          title="Contemplative Reptile"
        />
        <CardContent style={{zIndex: "1000"}}>
          <Typography gutterBottom variant="h5" component="h2">
            {props.image.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.image.domain}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default HoverSymbol
