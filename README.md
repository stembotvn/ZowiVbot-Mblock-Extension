# ZowiVbot-Mblock-Extension

Mblock là phần mềm cho phép lập trình Scratch cho Robot do hãng MakeBlock phát triển được kế thừa từ Scratch 2.0 của MIT.
Extension là tập hợp file cho phép cài đặt các Block cho các loại robot khác nhau để có thể chạy trên môi trường Mblock. 

Zowi-Vbot Extension do STEMbot phát triển để có thể lập trình cho Robot Zowi-Vbot để có thể chạy trên môi trường Mblock. 
Hiện tại ZowiVbot Extension chỉ hỗ trợ chế độ Scratch Mode (có thể hiểu là Online mode), hỗ trợ chạy chương trình Scratch trên Mblock và đồng bộ với Robot, có nghĩa là Mblock trên PC phải luôn chạy để Robot hoạt động, bộ não Robot lúc này là Mblock. 

## Cách cài đặt
* Dowload Extension với định dạng nén .Zip file về máy tính. 
* Mở phần mềm Mblock, vào tab Extensions/Manage Extensions -> Bấm "Add Extension" -> Chọn đường dẫn tới file Zip vừa download, chú ý chọn loại file là Zip để Extension xuất hiện trên màn hình tìm kiếm Extension. 
* Test chương trình 
## Hoạt động
ZowiVbot hỗ trợ 2 chế độ kết nối với Mblock là Serial via USB và Bluetooth
1. Serial Connection:
   * Bật nguồn cho Robot, đảm bảo Pin đầy để hoạt động
   * Cắm dây nối USB từ máy tính đến robot, chú ý, sử dụng dây Mini USB với chiều dài ít nhất 40 cm để Robot có thể hoạt động không bị vướng. 
   * Trên phần mềm Mblock, vào Connect/Serial Port: chọn cổng kết nối với Robot, nếu kết nối thành công sẽ được thông báo (Serial Connected)
   * Các Block liên quan đến hoạt động của robot thì vào mục Robot, Zowi Vbot hỗ trợ 3 loại Block: Move, Gesture và Sing với rất nhiều thuộc tính liên quan.
   
 2. Bluetooth Connection: 
 * Máy tính bắt buộc phải có chức năng Bluetooth, nếu không có thì sử dụng Bluetooth USB Dongle. 
 * Bật Bluetooth lên và Pair với Robot, chú ý, tên Device hiển thị là Zowi, các bạn có thể Pair lần đầu và sau đó đổi tên tùy ý, mật khẩu để Pair là 1234
 * Vào Connect/Bluetooth: chọn device vừa Pair là (Zowi với địa chỉ kèm theo dạng aa:bb:cc:dd:ee:ff) và bấm connect 
 * Nếu kết nối thành công, lập trình giống như với Serial Connection. 
 
 ## Note
   Khuyến nghị các bạn lập trình Scratch trên môi trường Mblock nên sử dụng cáp Serial, phiên bản Bluetooth hiện chưa được ổn đinh, chúng tôi sẽ khắc phục trong thời gian sớm nhất 
   
   Chúc các bạn thực hành vui vẻ với chú robot này
 
 

