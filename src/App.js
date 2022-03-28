import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './MediaWikiSitewide.css'
import Input from "antd/es/input";
import 'antd/dist/antd.css';
import './App.css';
import { UploadOutlined } from '@ant-design/icons';
import Button from "antd/es/button";
import Upload from "antd/es/upload";

function App() {
    const [result, setResult] = useState("");
    const onChange = (e) => {
        console.log(result)
        console.log(e.target.getAttribute('propname'))
        let temp = {[e.target.getAttribute('propname')]: e.target.value}
        console.log(temp)
        setResult({...result, [e.target.getAttribute('propname')]: e.target.value});
    }
    const [paramlist, setParamlist] = useState(1);
    const [imgfile, setImgfile] = useState(undefined);
    const [descline, setDescline] = useState(1);
    const [magicparamlist, setMagicparamlist] = useState(1);
    const addParam = () => {
        let paramcount = 1+paramlist;
        setParamlist(paramcount)
    }
    const addDesc = () => {
        let paramcount = 1+descline;
        setDescline(paramcount)
    }
    const addMagicParam = () => {
        let paramcount = 1+magicparamlist;
        setMagicparamlist(paramcount)
    }
    const Params = () => {
        var res=[];

        for (let i = 0; i < paramlist; i++) {

            res.push(
                <div style={{display: 'flex'}}>

                    <div style={{width: '40%'}}>
                        <span>Parameter</span>
                        <Input placeholder="Basic usage" onChange={onChange} propname={'param' + i}/>
                    </div>
                    <div style={{width: '40%'}}>
                        <span>Parameter value</span>
                        <Input placeholder="Basic usage" onChange={onChange} propname={'paramvalue' + i}/>
                    </div>

                </div>)

        }
        console.log(res)
        return res
    };

    const MagicParams = () => {
        var res=[];

        for (let i = 0; i < magicparamlist; i++) {

            res.push(
                <div style={{display: 'flex'}}>

                    <div style={{width: '40%'}}>
                        <span>Parameter value</span>
                        <Input placeholder="Basic usage" onChange={onChange} propname={'magicparamvalue' + i}/>
                    </div>

                </div>)

        }
        console.log(res)
        return res
    };

    const Descline = () => {
        var res=[];

        for (let i = 0; i < descline; i++) {

            res.push(
                <div style={{display: 'flex'}}>

                    <div style={{width: '40%'}}>
                        <span>Parameter value</span>
                        <Input placeholder="Basic usage" onChange={onChange} propname={'desc' + i}/>
                    </div>

                </div>)

        }
        console.log(res)
        return res
    };

    const ViewParams = () => {
        var res=[]; console.log('res' +paramlist)
        for (let i = 0; i < paramlist; i++) {
            console.log('res2' +paramlist)
            res.push(
                <div>
                {result['param'+i]}: <em className="tc -value"><em className="tc -mod">{result['paramvalue'+i]}</em></em>
                </div>
        )

        }
        console.log(res)
        return res
    };

    const ViewMagicParams = () => {
        var res=[]; console.log('res' +magicparamlist)
        for (let i = 0; i < magicparamlist; i++) {
            console.log('res2' +magicparamlist)
            res.push(
                <div>
                    <em className="tc -value"><em className="tc -mod">{result['magicparamvalue'+i]}</em></em>
                </div>
            )

        }
        console.log(res)
        return res
    };

    const ViewDesc = () => {
        var res=[];

        for (let i = 0; i < descline; i++) {
            console.log('res2' +descline)
            res.push(
                <div>
                  {result['desc'+i]}
                </div>
            )

        }
        console.log(res)
        return res
    };
   // const [paramlist, setParamlist] = useState(1);
    const props = {
        name: 'file',
      //  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
                if (info.fileList[0]?.originFileObj) {
                    setImgfile(URL.createObjectURL(info.fileList[0].originFileObj))
                }
            }
        },
    };

    return (
        <div className="App">
            <div style={{display: 'flex'}}>
                <div style={{width: '30%'}}>
               <span className="item-box -unique"><span className="header -double">
        <span className="symbol"></span>
                   {result.name}
                   <br/>
                   {result.type}
                   <span className="symbol"></span>
      </span>
          <span className="item-stats">
              <span className="group">
                  Quality: <em className="tc -mod"> {result.quality}</em>
                  <br/>
                  {ViewParams()}
              </span>
              <span
                  className="group">Requires Level <em className="tc -value"><em className="tc -value">59</em></em>
                  , <em className="tc -value"><em className="tc -value">160</em></em>
                  Str
              </span>
              <span className="group tc -mod">
                 {ViewMagicParams()}
              </span>
              <span className="group tc -flavour">
                  {ViewDesc()}
              </span>
          </span>
                   <span
                       className="images"><a

                       className="image"><img alt="Iron Heart inventory icon.png"
                                              src={imgfile}
                                              decoding="async" width="156" height="234"
                                              data-image-name="Iron Heart inventory icon.png"
                                              data-image-key="Iron_Heart_inventory_icon.png"/>
                       </a>
                   </span>
               </span>
                </div>
                <div style={{width: '65%'}}>
                    <span>Name</span>
                    <Input placeholder="Basic usage" onChange={onChange} propname='name'/>
                    <span>Type</span>
                    <Input placeholder="Basic usage" onChange={onChange} propname='type'/>
                    <span>Quality</span>
                    <Input placeholder="Basic usage" onChange={onChange} propname='quality'/>
                    <Button onClick={addParam}>Add main param</Button>
                    {Params()}
                    <Button onClick={addMagicParam}>Add magic param</Button>
                    {MagicParams()}
                    <Button onClick={addDesc}>Add description line</Button>
                    {Descline()}

                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>

                </div>
            </div>

        </div>
    );
}

export default App;
