
class DomService {
    createAlert(text) {
        let alert = document.createElement('div');
        alert.className = 'alert alert-danger';
        alert.innerText = text;
        alert.style.display = 'none';

        return alert;
    }

    createFormGroup() {
        let group = document.createElement('div');
        group.className = 'form-group';

        return group;
    }

    createLabel(id, text) {
        let label = document.createElement('label');
        label.setAttribute('for', id);
        label.innerText = text;

        return label;
    }

    createSelectList(id, options) {
        let select = document.createElement('select');
        select.id = id;
        select.className = 'form-control';

        options.forEach((currentOption) => {
            let option = document.createElement('option');
            option.text = currentOption.text;
            option.value = currentOption.value;

            select.appendChild(option);
        });

        select.selectedIndex = 0;

        return select;
    }

    createNumberInput(id, min, max, placeholder) {
        let numberInput = document.createElement('input');
        numberInput.id = id;
        numberInput.type = 'number';
        numberInput.className = 'form-control';
        numberInput.min = min;
        numberInput.max = max;
        numberInput.setAttribute('placeholder', placeholder);

        return numberInput;
    }

    createButtonInput(id, text) {
        let button = document.createElement('input');
        button.id = id;
        button.type = 'button';
        button.className = 'btn btn-default col-xs-12 col-md-4';
        button.value = text;

        return button;
    }
}

let domService = new DomService();

export default domService;