// views edit
$(document).on("click", ".views-edit", function () {
  var idtt = $(this).attr("idtk");
  $.ajax({
    async: false,
    type: "POST",
    url: "./QlTaiKhoan/viewsedit",
    data: { idtk: idtt },
    success: function (response) {
      $("#viewseditidtaikhoan").val(response.id_login)
      $("#views-edit-name-taikhoan").val(response.user_login)
    },
    error: function (xhr, ajaxOptions, thrownError) {
      Swal.fire(
        'Thông Báo!',
        'Thao Tác không thể thực hiện.',
        'danger'
      ).then(function () {
        location.reload();
      })
    }
  });
});
//views edit
//edit
$(document).on("click", ".edit-taikhoan", function () {
  var idtt = $(this).attr("idtk");
  $.ajax({
    async: false,
    type: "POST",
    url: "./QlTaiKhoan/edittk",
    data: { idtk: idtt },
    success: function (response) {
      $("#edit-id-taikhoan").val(response.id_login)
      $("#edit-name-taikhoan").val(response.user_login)
    },
    error: function (xhr, ajaxOptions, thrownError) {
      Swal.fire(
        'Thông Báo!',
        'Thao Tác không thể thực hiện.',
        'danger'
      ).then(function () {
        location.reload();
      })
    }
  });
})
$(document).on("click", ".del-taikhoan", function () {
  var idtt = $(this).attr("idtk");
  Swal.fire({
    title: 'Bạn Có Chắc Chắn?',
    text: "Dữ Liệu Sẽ Không Thể Phục Hồi!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Đồng Ý, Xóa!',
    cancelButtonText: 'Hủy bỏ',
    style: 'font-size:500px'
  }).then((function () {
    $.ajax({
      async: false,
      type: "delete",
      url: "./QLTaiKhoan/del",
      data: { idtk: idtt },
      success: function (response) {
        Swal.fire(
          'Thông Báo!',
          'Xóa Thành Công.',
          'success'
        ).then(function () {
          location.reload();
        })
      },
      error: function (xhr, ajaxOptions, thrownError) {
        Swal.fire(
          'Thông Báo!',
          'Thao Tác không thể thực hiện.',
          'danger'
        ).then(function () {
          location.reload();
        })
      }
    });
  }));
})
//edit