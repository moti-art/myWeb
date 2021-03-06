
import React from 'react';
import {Bar} from 'react-chartjs-2';
import axios from 'axios'
import {Charts} from "../../models/Charts"
import Button from "@material-ui/core/Button";


interface Chart {
    followers: Charts[];
    dataState:any;

  }

export default class charts extends React.Component<any , Chart> {
  constructor(props: any) {
    super(props);
    this.state = { followers: [] , dataState:{
      labels: [],
      datasets: [
        {
          label: 'totall followers',
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: []
        }
      ]
    } }
    
  }

  public async componentDidMount(){
 let vacationName ;
 let vacationFollowers;
 let arr=[];
 let arr2=[]
 let item={...this.state.dataState};

    try {
      const response = await axios.get<Charts[]>(
        "http://localhost:3001/vacations/charts"
      );
      this.setState({ followers: response.data});
     

      vacationName= this.state.followers.map((x)=>(x.description))
      vacationFollowers = this.state.followers.map((y)=>(y.amount_of_followers))
      

            for (let i = 0; i < this.state.followers.length; i++) {
              arr[i] = vacationName[i];
              arr2[i] = vacationFollowers[i];
            }
            item.labels= arr
            item.datasets[0].data = arr2;

            this.setState({dataState:item})

    } catch (err) {
      alert(err);
      console.log(err);
    }
  }

  render() {
    return (
      <div>

        <Bar
          data={this.state.dataState}
          options={{
            title:{
              display:true,
              text:'Amount of Followers per Vacation',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />

        <Button
          variant="contained"
          color="primary"
          href={"/admin"}
          className="back"
        >
          Back to Admin page
        </Button>

      </div>
    );
  }
}