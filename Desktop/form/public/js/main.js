$(document).ready(() => {
    $('.delete-student').on('click', (e) => {
        $target = $(e.target);
        const id = $target.attr('data-id');
        $.ajax({
            type:'DELETE',
            url: '/students/'+id,
            success: function(response){
                alert('Delete Student');
                window.location.href='/';
            },
        });
    });
});