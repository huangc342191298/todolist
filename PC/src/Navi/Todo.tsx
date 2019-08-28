import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import { Table, Divider, Tag ,Popconfirm, message} from 'antd';

const { Column, ColumnGroup } = Table;


class Todo extends Component<any,any> {
	_id: any;

	constructor(props:any) {
		super(props);
		this.state = {
			todoList: [],
			showTooltip: false  // 控制 tooltip 的显示隐藏
		}
	}
	
	componentDidMount () {
		// 获取所有的 todolist
		this._getTodoList();
  	}
	
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
	
	// 添加 todo
	_onNewItem (newItem:any) {
		const that = this;
		$.ajax({
			url: '/addItem',
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
	_onDeleteItem () {
		const that = this;
		console.log(that);
		let _id:any =  that._id;
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
	

	// 提交表单操作
	handleSubmit(event:any){

		event.preventDefault();
		// 表单输入为空验证
		let content:any  = this.refs.content;
		if(content.value == "") {
			content.focus();
			this.setState({
				showTooltip: true
			});
			return ;
		}
		let month: string | number = new Date().getMonth() + 1;
		let date: string | number = new Date().getDate();
		let hours: string | number = new Date().getHours();
		let minutes: string | number = new Date().getMinutes();
		let seconds: string | number = new Date().getSeconds();

		if (hours < 10) { hours  = hours.toString(); hours += '0'; }
		if (minutes < 10) { minutes  = minutes.toString();minutes += '0'; }
		if (seconds < 10) { seconds  = seconds.toString();seconds += '0'; }
        
		// 生成参数
		const newItem={
			content: content.value,
			date: month + "/" + date + " " + hours + ":" + minutes + ":" + seconds
		};

		console.log(newItem);
		// 添加 todo
		this._onNewItem(newItem)
		// 重置表单
		let refs:any  = this.refs;
		refs.todoForm.reset();
		// 隐藏提示信息
		this.setState({
			showTooltip: false,
		});
	}



  	render() {
	  	return (
		<Table dataSource={this.state.todoList}>
			<Column title="时间" dataIndex="date" key="date" />
			<Column title="内容" dataIndex="content" key="content" />
			<Column
			title="操作"
			key="action"
			render={(_text:any, record:any) => (
				<span>
				<a>编辑</a>
				<Divider type="vertical" />
				<Popconfirm
					title="确定要删除该待办吗?"
					onConfirm={this._onDeleteItem.bind(record)}
					onCancel={this.cancel}
					okText="确定"
					cancelText="取消"
				>
					<a href="#">删除</a>
				</Popconfirm>
				</span>
			)}
			/>
		</Table>
  		)
  	}
}

export default Todo;
