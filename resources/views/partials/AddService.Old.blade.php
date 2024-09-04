
    <form id="NewServiceForm" action="/create-service" method="POST">
        @csrf
        <input id="servicename" name="service_name" placeholder="Service Name" required />
        <input id="serviceshort" name="service_short" placeholder="Short Description" required />
        <textarea rows="5" id="service_long" name="service_long" placeholder="Long Description" required></textarea>
        <input id="serviceimage" class="serviceimage" name="service_image" placeholder="No image selected" required />                   
    </form>

<script src="{{ asset('ckeditor/ckeditor.js') }}"></script>
<script>
    CKEDITOR.replace( 'service_long' );
    CKEDITOR.config.resize_enabled = false;
</script>