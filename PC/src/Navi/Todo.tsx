import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import { Table, Divider, Button ,Popconfirm,Modal,Input , message} from 'antd';

const { Column, ColumnGroup } = Table;
const { TextArea } = Input;

class Todo extends Component<any,any> {
	_id: any;

	constructor(props:any) {
		super(props);
		this.state = {
			value:"",
			editvalue:"",
			visible: false,
			editvisible: false,
			editid:"",
			todoList: []
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleEditChange = this.handleEditChange.bind(this);
		this._onDeleteItem = this._onDeleteItem.bind(this);
		this.handlEditeOk = this.handlEditeOk.bind(this);
		this.showEditModal = this.showEditModal.bind(this);
		
	}
	
	componentDidMount () {
		// 获取所有的 todolist
		this._getTodoList();
  	}

	  showModal = () => {
		const that = this;
		that.setState({
		  visible: true,
		});
	  };
	  showEditModal(recond: { _id: any; content: any; }){
		const that = this;
		that.setState({
			editvisible: true,
			editid:recond._id,
			editvalue:recond.content
		});
	  };

	  handleOk= () => {
		// console.log(e);
		const that = this;
		that.setState({
		  visible: false,
		});
		var year=new Date().getFullYear();
		let month: string | number = new Date().getMonth() + 1;
		let date: string | number = new Date().getDate();
		let hours: string | number = new Date().getHours();
		let minutes: string | number = new Date().getMinutes();
		let seconds: string | number = new Date().getSeconds();
		let Milliseconds: string | number = new Date().getMilliseconds() //毫秒 
		if (hours < 10) { hours  = hours.toString(); hours += '0'; }
		if (minutes < 10) { minutes  = minutes.toString();minutes += '0'; }
		if (seconds < 10) { seconds  = seconds.toString();seconds += '0'; }
        
		// 生成参数
		var newItem={
			content: that.state.value,
			date: year+"/"+month + "/" + date + " " + hours + ":" + minutes + ":" + seconds +" "+Milliseconds
		};

		console.log(newItem);
		// 添加 todo
		this._onNewItem(newItem);
	  };
	  handlEditeOk(recond: { content: any; _id: any; }){
		// console.log(e);
		const that = this;
		that.setState({
			editvisible: false,
		});
	
		// 生成参数
		var updateItem={
			content: that.state.editvalue,
			_id:that.state.editid 
		};

		console.log(updateItem);
		// 更新 todo
		this._onUpdateItem(updateItem);
	  };

	  handleCancel= () => {
		// console.log(e);
		const that = this;
		that.setState({
		  visible: false,
		  editvisible: false,
		});
	  };
	// 获取 todolist
	_getTodoList () {
		const that = this;
  		$.ajax({
  			url: 'http://localhost:8888/getAllItems',
  			type: 'get',
  			dataType: 'json',
  			success: data => {
  				console.log(data);
				// const todoList = that.todoSort(data)
				that.setState({ 
					todoList: data
				});
  			},
  			error: err => {
				console.log(err);
			}
  		});
	}
	
	//  编辑 todo
	_onUpdateItem (updateItem:any) {
		const that = this;
		$.ajax({
			url: 'http://localhost:8888/updateItem',
			type: 'post',
			dataType: 'json',
			data: updateItem,
			success: data => {
				console.log(data);
				const todoList = that.todoSort(data);
				that.setState({ 
					todoList 
				});
			},
			error: err => {
				console.log(err);
			}
		})
	}
//添加 todo
_onNewItem (newItem:any) {
	const that = this;
	$.ajax({
		url: 'http://localhost:8888/addItem',
		type: 'post',
		dataType: 'json',
		data: newItem,
		success: data => {
			console.log(data);
			const todoList = that.todoSort(data);
			that.setState({ 
				todoList 
			});
		},
		error: err => {
			console.log(err);
		}
	})
}

	// 删除 todo
	_onDeleteItem (recond: { _id: any; }) {
		const that = this;
		console.log(that);
		let _id:any =  recond._id;
		console.log(_id);
		const postData = { 
			_id: _id
		};
		$.ajax({
			url: 'http://localhost:8888/deleteItem',
			type: 'post',
			dataType: 'json',
			data: postData,
			success: data => {
				console.log(data);
				this._getTodoList();
			},
			error: err => {
				console.log(err);
			}
		})
	}
	
	// 对 todolist 进行逆向排序（使新录入的项目显示在列表上面） 
	todoSort (todoList:any) {
		todoList.reverse();
		return todoList;
	}

	 
	  
	   cancel(e:any) {
		console.log(e);
		// message.error('Click on No');
	  }
	
	handleChange(event: { target: { value: any; }; }) {
		this.setState({value: event.target.value});
	  }


	  handleEditChange(event: { target: { value: any; }; }) {
		this.setState({editvalue: event.target.value});
	  }
	  
  	render() {
		var value = this.state.value;
		var editvalue = this.state.editvalue;
	  	return (
			<div>
		
			<div>
        <Button type="primary" icon="plus-circle"  onClick={this.showModal}>
         添加
        </Button>
        <Modal
          title="添加待办"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div><TextArea
          value={value}
          onChange={this.handleChange}
          placeholder="add to do"
          autosize={{ minRows: 3, maxRows: 5 }}
          />
         </div>
        </Modal>
      </div>
		<Table dataSource={this.state.todoList}>
			<Column title="时间" dataIndex="date" key="date" />
			<Column title="内容" dataIndex="content" key="content" />
			<Column
			title="操作"
			key="action"
			render={(_text:any, record:any) => (
				<span>
					<a   onClick={this.showEditModal.bind(this,record)}>
         编辑
        </a>
				<Modal
          title="编辑待办"
          visible={this.state.editvisible}
          onOk={this.handlEditeOk.bind(this,record)}
          onCancel={this.handleCancel}
        >
          <div><TextArea
          value={editvalue}
          onChange={this.handleEditChange}
          placeholder="edit to do"
          autosize={{ minRows: 3, maxRows: 5 }}
          />
         </div>
        </Modal>
				<Divider type="vertical" />
				<Popconfirm
					title="确定要删除该待办吗?"
					onConfirm={this._onDeleteItem.bind(this,record)}
					onCancel={this.cancel}
					okText="确定"
					cancelText="取消"
				>
					<a href="#">删除</a>
				</Popconfirm>
				</span>
			)}
			/>
		</Table></div>
  		)
  	}
}

export default Todo;
