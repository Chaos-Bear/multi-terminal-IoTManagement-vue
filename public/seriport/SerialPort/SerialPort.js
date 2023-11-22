/*
let SerialPort=new FOFWebSerialPort();
function testIt() {
    SerialPort.ChoiceSerialPort((ev)=>{
        console.log(ev);
    },(ev)=>{
        console.log("连接成功");
    },(ev)=>{
        console.log("连接失败");
    })
    SerialPort.OpenSerialPort();
    SerialPort.SendData("A00105A6");
    SerialPort.GetSerialPortData(5000,(ev)=>{
        console.log("收到数据："+ev);
    })
}
*/

const FOF_fromHexString = hexString =>
    new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
const FOF_toHexString = bytes =>
    bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');

//注意：只有谷歌浏览器支持该类
class FOFWebSerialPort {
    constructor() {
        this.ports = undefined;
    }
    //选择串口设备
    //success-本次选择设备状态回调函数，函数内指定一个参数接收回调信息
    //connect-连接回调信息，函数内指定一个参数接收回调信息
    //disconnect-断开回调信息，函数内指定一个参数接收回调信息
    //filters指定串口供应商ID【usbVendorId】和产品ID【usbProductId】，格式：[{ usbVendorId: 0x2341, usbProductId: 0x0043 },{ usbVendorId: 0x2341, usbProductId: 0x0001 }]
    async ChoiceSerialPort(success = undefined, connect = undefined, disconnect = undefined, filters = []) {
        this.ports = await navigator.serial.getPorts();
        if (this.ports.length <= 0) {
            try {
                if (filters == []) {
                    let port = await navigator.serial.requestPort();
                } else {
                    let port = await navigator.serial.requestPort({ filters });
                }
                this.ports = await navigator.serial.getPorts();
                if (this.ports.length <= 0) {
                    if (success != undefined) {
                        success("失败")
                    }
                } else {
                    if (success != undefined) {
                        success("成功")
                    }
                }
            } catch (ex) {
                if (ex.name === 'NotFoundError') {
                    if (success != undefined) {
                        success("未找到设备")
                    }
                } else {
                    if (success != undefined) {
                        success(ex)
                    }
                }
            }
        } else {
            if (success != undefined) {
                success("链接成功")
            }
        }
        navigator.serial.addEventListener("connect", (event) => {
            // TODO: 自动打开事件。目标器或警告用户端口可用。
            if (connect != undefined) {
                connect(event)
            }
        });
        navigator.serial.addEventListener("disconnect", (event) => {
            // TODO: Remove |event.target| from the UI.
            // 如果打开了串行端口，还会观察到流错误。
            if (disconnect != undefined) {
                disconnect(event)
            }
        });
    }
    //连接串口,必须先选择串口后才可以打开
    async OpenSerialPort(baudRate_ = 9600, dataBits_ = 8, stopBits_ = 1, parity_ = 'none', flowControl_ = 'none') {
        if(this.ports==undefined)
        {
            return;
        }
        if(this.ports.length<=0)
        {
            return;
        }
        try {
            await this.ports[0].open({
                baudRate: baudRate_, // 波特率
                dataBits: dataBits_, // 每帧的数据位数(7或8)
                stopBits: stopBits_, // 停止位数(1或2)
                parity: parity_, // 校验模式，可以是none，偶数，奇数
                flowControl: flowControl_ // 流控模式(none或hardware)。
            }) 
        } catch (error) {
            
        }
    }
    //关闭串口
    async CloseSerialPort() {
        if(this.ports==undefined)
        {
            return;
        }
        if(this.ports.length<=0)
        {
            return;
        }
        await this.ports[0].close();
    }
    //发送串口数据
    //Data-十六进制文本数据
    async SendData(Data) {
        if(this.ports==undefined)
        {
            return;
        }
        if(this.ports.length<=0)
        {
            return;
        }
        let writer = this.ports[0].writable.getWriter();
        let data = FOF_fromHexString(Data); // hello
        await writer.write(data);
        writer.releaseLock();
    }
    //获取十六进制串口数据
    //Time-超时时间，默认5000
    //success-获取串口数据的回调信息-函数内指定一个参数接收回调信息
    async GetSerialPortData(Time=5000, success = undefined) {
        if(this.ports==undefined)
        {
            return;
        }
        if(this.ports.length<=0)
        {
            return;
        }
        let dates = new Date();
        dates.getTime();//时间戳
        // 监听来自串行设备的数据。
        let IfData=false;
        while (this.ports[0].readable) {
            try {
                const reader = this.ports[0].readable.getReader();
                while (true) {
                    const { value, done } = await reader.read();
                    let dates1 = new Date();
                    dates1.getTime();//时间戳
                    if (dates1 > dates + Time) {
                        if (success != undefined) {
                            success("读取数据超时错误")
                        }
                        break;
                    }
                    if (done) {
                        // 允许稍后关闭串口。
                        reader.releaseLock();
                        break;
                    }
                    if (value) {
                        if (success != undefined) {
                            success(FOF_toHexString(value))
                            IfData=true;
                        }
                    }
                }
            } catch (error) {
                /*
                if (success != undefined) {
                    success("读取失败，错误原因：" + error)
                }
                */
                break;
            }
        }
    }
    //获取文本串口数据
    //Time-超时时间，默认5000
    //success-获取串口数据的回调信息-函数内指定一个参数接收回调信息
    async GetSerialPortStrData(Time, success = undefined) {
        if(this.ports==undefined)
        {
            return;
        }
        if(this.ports.length<=0)
        {
            return;
        }
        const textDecoder = new TextDecoderStream();
        const readableStreamClosed = this.ports[0].readable.pipeTo(textDecoder.writable);
        const reader = textDecoder.readable.getReader();
        let dates = new Date();
        dates.getTime();//时间戳
        // 监听来自串行设备的数据。
        while (true) {
            const { value, done } = await reader.read();
            let dates1 = new Date();
            dates1.getTime();//时间戳
            if (dates1 > dates + Time) {
                if (success != undefined) {
                    success("读取数据超时错误")
                }
                break;
            }
            if (done) {
                // 允许稍后关闭串口。
                reader.releaseLock();
                break;
            }
            if (success != undefined) {
                success(value)
            }
        }
    }
    //获取设备信息
    GetInfo() {
        if(this.ports==undefined)
        {
            return { "usb供应商ID": "", "usb产品ID": "" };
        }
        if(this.ports.length<=0)
        {
            return { "usb供应商ID": "", "usb产品ID": "" };
        }
        let portInfo = this.ports[0].getInfo();
        return { "usb供应商ID": portInfo.usbVendorId, "usb产品ID": portInfo.usbProductId }
    }
    //关闭串行中断信号。
    async setSignalsbreak() {
        if(this.ports==undefined)
        {
            return;
        }
        if(this.ports.length<=0)
        {
            return;
        }
        await this.ports[0].setSignals({ break: false });
    }
    //打开DTR信号。
    //打开DTR (Data Terminal Ready)信号。
    async setSignalsdataTerminalReady() {
        if(this.ports==undefined)
        {
            return;
        }
        if(this.ports.length<=0)
        {
            return;
        }
        await this.ports[0].setSignals({ dataTerminalReady: true });
    }
    //关闭RTS发送请求信号
    //关闭发送请求(RTS)信号。
    async setSignalsrequestToSend() {
        if(this.ports==undefined)
        {
            return;
        }
        if(this.ports.length<=0)
        {
            return;
        }
        await this.ports[0].setSignals({ requestToSend: false });
    }
    //获取信号相关信息
    //success为回调函数，函数内指定一个参数接收回调信息
    async getSignalsrequestToSend(success = undefined) {
        if(this.ports==undefined)
        {
            return;
        }
        if(this.ports.length<=0)
        {
            return;
        }
        const signals = await this.ports[0].getSignals();
        if (success != undefined) {
            success(signals)
        }
    }

}
