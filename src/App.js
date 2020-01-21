import React from 'react';
import logo from './logo.svg';
import './App.css';
import ListItem from './ListItem';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

library.add(faTrash);

class App extends React.Component{
  constructor(props)
  {
    super(props);
    this.state={
      items:[],
      currentItem:{
        text:'',
        key:''
      }
    }
    this.handleInput=this.handleInput.bind(this);// inside constructor, we have to bind our this to the this of handleInput and addItem
    this.addItem=this.addItem.bind(this);
    this.deleteItem=this.deleteItem.bind(this);
    this.setUpdate=this.setUpdate.bind(this);
  }
  //handleinput is called each time a new item is input and the state is set to the current item's values
  //addItem is called each time the add button is clicked and the inpu value is added to the list as a newItem and displayed on the screen.
  handleInput(e)
  {
    this.setState({
        currentItem:
        {
          text: e.target.value,
          key:Date.now()
        }
    })
  }
  addItem(e)
  {
    e.preventDefault();  // to prevent refreshing/reloading of page on button click
    const newItem= this.state.currentItem;//newItem is assigned the value of current input
    console.log(newItem);//displaying on console
    if(newItem.text!=="")
    {
      const newItems=[...this.state.items, newItem];//destructuring assignments// first parameter unpacks all the items into individual items
      this.setState({
        items:newItems,
        currentItem:{
          text:'',
          key:''
        }
      })

    }
  }
  deleteItem(key)
  {
    const filteredItems= this.state.items.filter(item=>
    item.key!==key);
    this.setState({
      items:filteredItems
    })
  }
  setUpdate(text,key)
  {
    const items=this.state.items;
    items.map(item=>{
      if(item.key===key){
        item.text=text;

      }
    })
    this.setState({
      items:items
    })
  }
  render(){
    return(

      <div className="App">
        <header>
        <form id="to-do-list" onSubmit={this.addItem}>
          <input type="text" placeholder="Enter task" value={this.state.currentItem.text} onChange={this.handleInput} required/>
          <button type="submit">Add</button>
        </form>
      </header>
      <ListItem items = {this.state.items}
      deleteItem={this.deleteItem}
      setUpdate={this.setUpdate}>
      </ListItem>

      </div>
    );
  }
}

export default App;
