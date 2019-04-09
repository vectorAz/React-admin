import React, { Component } from 'react'
import { Upload, Icon, Modal,message } from 'antd';
import PropTypes from 'prop-types'
import {RemoveImg} from '../../../api/index'
export default class PicturesWall extends Component {

    static propTypes={
        _id:PropTypes.string.isRequired,
        imgs:PropTypes.array.isRequired
    }
    constructor(props){
        super(props)
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList:this.props.imgs.map((item,index)=>{
                return {
                    uid:-index,
                    name:item,
                    status:'done',
                    url:'http://localhost:5000/upload/'+item
                }
            })
            // [{
            //   uid: '-1', //key
            //   name: 'xxx.png',//图片名
            //   status: 'done', //图片状态
            //   url: '/manage/img/upload',
            // }],
          };
        
    }


  //取消上传时触发
  handleCancel = () => this.setState({ previewVisible: false })
  //预览
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  //变化
  handleChange =async ( {file, fileList }) =>{
    //   console.log(file);
    //   console.log('--------');
    //   console.log(fileList);
        if(file.status==='done'){
            const lastfile= fileList[fileList.length-1] //上传的图片永远是最后一张
          lastfile.name=file.response.data.name
          lastfile.url=file.response.data.url

        } else if(file.status==='removed'){
            const {name}=file
            const {_id}=this.props;
           const restle=await RemoveImg(name,_id)
           console.log(restle);
           
            if(restle.status===0){
                message.success('图片删除成功')
            }else{
            message.error('图片删除失败')
            }
            
        }else if(file.status==='error'){
            message.error('图片上传失败')
        }


    this.setState({ fileList })
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const {_id} =this.props
    //上传的按钮
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/manage/img/upload" //上传的服务器地址
          listType="picture-card" //类型
          fileList={fileList}  //已经上传的图片列表
          onPreview={this.handlePreview} //预览
          onChange={this.handleChange} //删除
          name='image'
          data={{id:_id}}
        >
        {uploadButton}
          {/* {fileList.length >= 3 ? null : uploadButton} */}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}