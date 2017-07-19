$(function () {
    //选项卡
    $('.tab-btn').hover(function () {
        $('.tab-view').eq($(this).index()).stop().show(300);
    }, function () {
        $('.tab-view').eq($(this).index()).stop().hide('slow');

    });

    //购物车
    $('.shopping-car').hover(function () {
        $('.goods').stop().slideDown(300);
    }, function () {
        $('.goods').stop().slideUp(300);

    });



    //导航栏下拉列表



    $('.main-nav li').hover(function () {
        $('.slide-down').eq($(this).index()).stop().slideDown(300);
    }, function () {
        $('.slide-down').eq($(this).index()).stop().slideUp(300);
        // $('.slide-down').stop().slideUp(300);

    });

  
//搜索框
    $('.search').on({
        focus: function () {
            $('.select').stop().show();
          
        },
        change:function () {
            $('.select').stop().hide(); 
        if($('.search').val()===''){
            $('.groom').stop().show();  
            $('.select').stop().hide();       
        }else{
             $('.groom').stop().hide();
        }
    }
})
   $('.tips a').click(function () {
                $('.search').val($(this).text());
                $('.select').stop().hide();
                $('.groom').stop().hide();
            })

 $('.search').on('input', function () {
        $.get('data.json', function (data) {
            arr = [];
            for (var i in data) {
                arr.push(data[i]);
            }
            for (var j=0;j<arr.length;j++) {
                $('.tips a').eq(j).html(arr[j]) 
            }
        });

    });




});