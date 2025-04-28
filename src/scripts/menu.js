function initMenu() {
    document.querySelector('#menu-container ').classList.add('show')

    const listItems = document.querySelectorAll('#menu-container .item');

    function handleUpdatingPositions() {
        const list1Items = Array.from(document.querySelectorAll('#list1 .item')).map(el => el.textContent.trim());
        const list2Items = Array.from(document.querySelectorAll('#list2 .item')).map(el => el.textContent.trim());

        console.log('Поточний порядок:');
        console.log('Колонка 1:', list1Items);
        console.log('Колонка 2:', list2Items);

        listItems.forEach(item => {
            if (item.classList.contains('selected')) {
                if (item.closest('.block-2')) {
                    item.classList.remove('selected');
                }
            }
        })
    }

    const options = {
        group: 'shared',
        animation: 150,
        onSort: handleUpdatingPositions,
        onAdd: handleUpdatingPositions,
        onRemove: handleUpdatingPositions,
    };

    const list1 = new Sortable(document.getElementById('list1'), options);
    const list2 = new Sortable(document.getElementById('list2'), options);
    list1.option("disabled", true);


    handleUpdatingPositions();


    document.querySelector('.block-1 .add-elem').addEventListener('click', function() {
        document.querySelector('#menu-container').classList.toggle('wide');
        const draggable = document.querySelector('#menu-container').classList.contains('wide')
        list1.option("disabled", !draggable);
    });


    listItems.forEach(clickedItem => {
        clickedItem.addEventListener('click', function() {
            if (clickedItem.classList.contains('add-elem'))  return

            listItems.forEach(item => {
               if (item === clickedItem) {
                   item.classList.toggle('selected');
               } else {
                   item.classList.remove('selected');
               }
            })
        });
    })
}

export {
    initMenu
};
