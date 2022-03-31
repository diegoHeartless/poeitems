import React, {useEffect, useRef, useState} from 'react';
import logo from './logo.svg';
import './MediaWikiSitewide.css'
import Input from "antd/es/input";
import 'antd/dist/antd.css';
import './App.css';
import {UploadOutlined} from '@ant-design/icons';
import Button from "antd/es/button";
import Upload from "antd/es/upload";
import {saveAsPng, saveAsJpeg} from 'save-html-as-image';
import Checkbox from "antd/es/checkbox";
import Divider from "antd/es/divider";
import Card from "antd/es/card";


function App() {
    const [result, setResult] = useState({});
    const onChange = (e) => {
        console.log(result)
        console.log(e.target.getAttribute('propname'))
        let temp = {[e.target.getAttribute('propname')]: e.target.value}
        console.log(temp)
        setResult({...result, [e.target.getAttribute('propname')]: e.target.value});
        console.log(result)
    }
    const [paramlist, setParamlist] = useState([]);
    const [corrupt, setCorrupt] = useState(false);
    const [imgfile, setImgfile] = useState(undefined);
    const [descline, setDescline] = useState([]);
    const [reqparam, setReqparam] = useState([]);
    const [impparam, setImpparam] = useState([]);
    const [magicparamlist, setMagicparamlist] = useState([]);
    /*   const addParam = () => {
           let paramcount = 1+paramlist;
           setParamlist(paramcount)
       }*/
    const addParam = (fun, state, parname) => {
        console.log(result)
        var numberPattern = /\d+/g;
        let currentLastNumber = (state.length - 1 >= 0) ? Number(state[state.length - 1].match(numberPattern)) + 1 : 0;
        fun(state.concat([parname + currentLastNumber]))
        console.log(paramlist)
    }
    const deleteField = (fun, state, parname) => {

        var arr = state.filter(item => item !== parname)

        console.log('deleteField1 ' + parname)
        fun(arr)
        console.log('deleteField1 ' + state)
        let delRes = result;
        console.log('deleteField21 ' + result)
        delete delRes[parname]
        delete delRes[parname + 'value']
        console.log('deleteField2 ' + delRes)
        setResult(delRes);
        console.log('deleteField3 ' + paramlist)
    }
    const addDesc = () => {
        let paramcount = 1 + descline;
        setDescline(paramcount)
    }
    const addMagicParam = () => {
        let paramcount = 1 + magicparamlist;
        setMagicparamlist(paramcount)
    }


    const Params = (fun, state) => {
        var res = [];

        state.forEach((par) => {
            console.log('Params  ' + par)
            res.push(
                <div style={{display: 'flex'}}>

                    <div style={{width: '40%'}}>
                        <span>Parameter</span>
                        <Input placeholder="Basic usage" onChange={onChange} value={result[par]} propname={par}/>
                    </div>
                    <div style={{width: '40%'}}>
                        <span>Parameter value</span>
                        <Input placeholder="Basic usage" onChange={onChange} value={result[par + 'value']}
                               propname={par + 'value'}/>
                    </div>
                    <Button onClick={() => deleteField(fun, state, par)}
                            style={{'margin-top': '22px', 'margin-left': '10px'}}>delete </Button>
                </div>)

        })

        return res
    };

    const MagicParams = () => {
        var res = [];

        // for (let i = 0; i < magicparamlist; i++) {
        magicparamlist.forEach((par) => {
            res.push(
                <div style={{display: 'flex'}}>

                    <div style={{width: '40%'}}>
                        <span>Magic Parameter value</span>
                        <Input placeholder="Basic usage" onChange={onChange} value={result[par]} propname={par}/>
                    </div>
                    <Button onClick={() => deleteField(setMagicparamlist, magicparamlist, par)}
                            style={{'margin-top': '22px', 'margin-left': '10px'}}>delete </Button>
                </div>)

        })

        return res
    };

    const ImpParams = () => {
        var res = [];

        // for (let i = 0; i < magicparamlist; i++) {
        impparam.forEach((par) => {
            res.push(
                <div style={{display: 'flex'}}>

                    <div style={{width: '40%'}}>
                        <span>Magic Parameter value</span>
                        <Input placeholder="Basic usage" onChange={onChange} value={result[par]} propname={par}/>
                    </div>
                    <Button onClick={() => deleteField(setImpparam, impparam, par)}
                            style={{'margin-top': '22px', 'margin-left': '10px'}}>delete </Button>
                </div>)

        })

        return res
    };


    const Descline = () => {
        var res = [];

        descline.forEach((par) => {
            res.push(
                <div style={{display: 'flex'}}>

                    <div style={{width: '40%'}}>
                        <span>Parameter value</span>
                        <Input placeholder="Basic usage" onChange={onChange} value={result[par]} propname={par}/>
                    </div>
                    <Button onClick={() => deleteField(setDescline, descline, par)}
                            style={{'margin-top': '22px', 'margin-left': '10px'}}>delete </Button>
                </div>)

        })

        return res
    };

    const ViewParams = () => {
        var res = [];

        paramlist.forEach((param) => {
            res.push(
                <div>
                    {result[param]}: <em className="tc -value"><em
                    className="tc -mod">{result[param + 'value']}</em></em>
                </div>
            )
        })

        console.log(res)
        return res
    };

    const ViewMagicParams = () => {
        var res = [];

        //  for (let i = 0; i < magicparamlist; i++) {
        magicparamlist.forEach((par) => {
            console.log('res2' + magicparamlist)
            res.push(
                <div>
                    <em className="tc -value"><em className="tc -mod">{result[par]}</em></em>
                </div>
            )

        })

        return res
    };

    const ImpMagicParams = () => {
        var res = [];

        //  for (let i = 0; i < magicparamlist; i++) {
        impparam.forEach((par) => {
            console.log('res2' + magicparamlist)
            res.push(
                <div>
                    <em className="tc -value"><em className="tc -mod">{result[par]}</em></em>
                </div>
            )

        })

        return res
    };
    const ViewDesc = () => {
        var res = [];

        //  for (let i = 0; i < descline; i++) {
        descline.forEach((par) => {
            res.push(
                <div>
                    {result[par]}
                </div>
            )
        })
        console.log(res)
        return res
    };

    const ReqParams = () => {
        var res = [];

        reqparam.forEach((param) => {
            res.push(
                <span>
                , <em className="tc -value"><em className="tc -value">{result[param]}</em></em> {result[param+'value']}
                </span>
            )
        })

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

    const saveimg = () => {
        let test = document.getElementById('item');
        console.log(test)
        saveAsPng(test, {}, {pixelRatio: 10})
    }


    return (
        <div className="App">
            <div style={{display: 'flex'}}>
                <div id="item" style={{width: '30%'}}>
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
                  className="group">Requires Level <em className="tc -value"><em className="tc -value">{result.lvl}</em></em> {ReqParams()}
              </span>
                  <span className="group tc -mod">
                 {ImpMagicParams()}
                {/*      {corrupt ? <em className="tc -corrupted">Corrupted</em> : ''}*/}
              </span>
              <span className="group tc -mod">
                 {ViewMagicParams()}
                  {corrupt ? <em className="tc -corrupted">Corrupted</em> : ''}
              </span>
              <span className="group tc -flavour">
                  {ViewDesc()}
              </span>
          </span>
                   <span
                       className="images"><a

                       className="image"><img alt="You Amazing picture.png"
                                              src={imgfile}
                                              decoding="async" width="156" height="234"
                                              data-image-name="Iron Heart inventory icon.png"
                                              data-image-key="Iron_Heart_inventory_icon.png"/>
                       </a>
                   </span>
               </span>
                </div>
                <div style={{width: '65%'}}>
                    <div style={{width: '65%'}}>
                        <Card title="Name and Type" size="small">
                            <div style={{display: 'flex'}}>
                                <div style={{width: '40%'}}>
                                    <span>Name</span>
                                    <Input placeholder="Basic usage" onChange={onChange} propname='name'/>
                                </div>
                                <div style={{width: '40%'}}>
                                    <span>Type</span>
                                    <Input placeholder="Basic usage" onChange={onChange} propname='type'/>
                                </div>
                                <Checkbox onChange={() => setCorrupt((bool) => !bool)} style={{
                                    'margin-top': '25px',
                                    'margin-left': '10px',
                                    'color': 'red'
                                }}>Corrupted</Checkbox>
                            </div>
                        </Card>
                        <Card title="Quality and main parameters" size="small">
                            <span>Quality</span>
                            <Input placeholder="Basic usage" onChange={onChange} propname='quality'/>
                            <Button onClick={() => addParam(setParamlist, paramlist, 'param')}>Add main param</Button>
                            {Params(setParamlist, paramlist)}
                        </Card>
                        <Card title="Requared parameters" size="small">
                        <span>Level</span>
                        <Input placeholder="Basic usage" onChange={onChange} propname='lvl'/>
                            <Button onClick={() => addParam(setReqparam, reqparam, 'reqparam')}>Add req param</Button>
                            {Params(setReqparam, reqparam)}
                        </Card>
                        <Card title="Implict parameters" size="small">
                            <Button onClick={() => addParam(setImpparam, impparam, 'impparam')}>Add Implict
                                param</Button>
                            {ImpParams()}
                        </Card>
                        <Card title="Magic parameters" size="small">
                        <Button onClick={() => addParam(setMagicparamlist, magicparamlist, 'magicparam')}>Add magic
                            param</Button>
                        {MagicParams()}
                        </Card>
                        {/*  {Params(setMagicparamlist, magicparamlist)}*/}
                        <Button onClick={() => addParam(setDescline, descline, 'desc')}>Add description line</Button>
                        {Descline()}

                        <Upload {...props}>
                            <Button icon={<UploadOutlined/>}>Click to Upload</Button>
                        </Upload>
                        <Button onClick={saveimg}>Click to save</Button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default App;
