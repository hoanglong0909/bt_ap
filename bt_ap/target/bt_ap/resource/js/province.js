function deleteProvince(id) {
    let a = '#row' + id;
    Swal.fire({
        title: 'Bạn chắc chắn muốn xoá?',
        text: "Nội dung xoá sẽ mất vĩnh viễn",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Vâng, tôi muốn xoá',
        cancelButtonText: 'Không, cám ơn'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: "DELETE",
                url: '/delete-province/' + id,
                //xử lý khi thành công
                success: function (data) {
                    $(a).remove();
                    swal.fire(
                        "Thành công!",
                        "Một kho đã được xoá!",
                        "success"
                    )
                }
            });
            //chặn sự kiện mặc định của thẻ
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swal.fire(
                "Cancelled",
                "Lỗi đã xảy ra :(",
                "error"
            )
        }
    })
}

function loadEditData(id) {
    $.ajax({
        type: 'GET',
        url: '/api/' + id,
        success: function (province) {
            $('#exampleModalLabelSpan').text("Edit");
            $('#cId').val(province.id);
            $('#cName').val(province.name);
            $('#cAcreage').val(province.acreage);
            $('#cPopulation').val(province.population);
            $('#cGdp').val(province.gdp);
            $('#cDescription').val(province.description);
            $('#cCountry').val(province.country.id).change();
        }
    })
}


function editProvince() {
    let id = $('#cId').val();
    let name = $('#cName').val();
    let acreage = $('#cAcreage').val();
    let population = $('#cPopulation').val();
    let gdp = $('#cGdp').val();
    let description = $('#cDescription').val();
    let countryName = {"id": $('#cCountry').val()};

    let newProvince = {
        name: name,
        acreage: acreage,
        population: population,
        gdp: gdp,
        description: description,
        country: countryName
    }
    if (id == 0) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(newProvince),
            url: "/create-province",
            success: function (province) {
                $('#provinceList tbody').prepend(
                    ' <tr id="row' + province.id + '">\n' +
                    '      <td>' + province.id + '</td>\n' +
                    '      <td>' + province.name + '</td>\n' +
                    '      <td>' + province.acreage + '</td>\n' +
                    '      <td>' + province.population + '</td>\n' +
                    '      <td>' + province.gdp + '</td>\n' +
                    '      <td>' + province.description + '</td>\n' +
                    '      <td>' + province.country.name + '</td>\n' +
                    '      <td><button onclick="loadEditData(' + province.id + ',this)" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo"  class=" btn btn-outline-primary" ><a><i class="fas fa-edit">Edit</i></a></button>' +
                    '<input type="hidden" id="id" value="' + province.id + '"></td>\n' +

                    ' <td><button class="btn btn-outline-danger" onclick="deleteProvince(' + province.id + ')">' +
                    '<i class="fas fa-trash-alt"></i>Delete </button> </td>' +
                    ' </tr>');

                //sư kiện nào thực hiện Ajax
                $('.close-modal').click();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        });
    } else {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(newProvince),
            url: '/edit-province/' + id,
            success: function (province) {
                $('#row' + id + ' td').remove();
                $('#row' + id).html(`
                        <td>${province.id}</td>
                        <td>${province.name}</td>
                        <td>${province.acreage}</td>
                        <td>${province.population}</td>
                        <td>${province.gdp}</td>
                        <td>${province.description}</td>
                        <td>${province.country.name}</td>
                       <td><button onclick="loadEditData('${province.id}')"  data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo"  class="updateCustomer btn btn-outline-primary" href="' + customer.id + '"><a><i class="fas fa-edit">Edit</i></a></button><input type="hidden" id="id" value="' + customer.id + '"></td>
                      <td><button class="btn btn-outline-danger" onclick="deleteProvince('${province.id}',this)"><i
                    class="fas fa-trash-alt"></i>Delete</button></td>`);
                $('.close-modal').click();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'You have changed successfull',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        });
    }
}

function loadAddNew() {
    $('#exampleModalLabelSpan').text("Add new");
    $('#cId').val(0);
    $('#cName').val("");
    $('#cAcreage').val("");
    $('#cPopulation').val("");
    $('#cGdp').val("");
    $('#cDescription').val("");
    $('#cCountry').val("");
}