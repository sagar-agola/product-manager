import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CategoryService } from '../../category/category.service';
import { CategoryDetail } from '../../category/models/category-detail.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  validationMessages: any = {
    title: {
      required: 'Title is required field.',
      minlength: 'Title cannot be less than 15 characters.',
      maxlength: 'Title cannot be more than 500 characters.'
    },
    subTitle: {
      maxlength: 'Sub Title cannot be more than 500 characters.'
    },
    description: {
      maxlength: 'Description cannot be more than 1000 characters.'
    },
    retailPrice: {
      required: 'Retail Price is required field.',
      pattern: 'Invalid Retail Price value.'
    },
    salePrice: {
      required: 'Sale Price is required field.',
      pattern: 'Sale Retail Price value.'
    },
    quentity: {
      required: 'Quentity is required field.',
      pattern: 'Invalid Quentity value.'
    },
    categoryId: {
      required: 'Category is required field.'
    },
    manufactoredAt: {
      required: 'Manufactored Date is required field.',
      matDatepickerMax: 'Manufactored Date cannot be in future.'
    },
    isTurmsAccepted: {
      required: 'Please accept turms and conditions.'
    }
  };

  categories: CategoryDetail[] = [];
  productId: number = 0;
  selectedImagePath: string = "";
  imageErrorList: string[] = [];
  isFormSubmitted: boolean = false;
  formErrors: any = {};
  todayDate: Date = new Date();
  productDetailForm: FormGroup;
  productFormData: FormData = new FormData();

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder,
    private _productService: ProductService,
    private _categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.id && params.id > 0) {
        this.productId = Number(params.id);
        this.getProductDetails();
      }
    });

    this.getCategoryList();
    this.setupProductForm();
  }

  setupProductForm(): void {
    this.productDetailForm = this.formBuilder.group({
      title: [ null, [ Validators.required, Validators.minLength(15), Validators.maxLength(500) ] ],
      subTitle: [ null, [ Validators.maxLength(500) ] ],
      description: [ null, [ Validators.maxLength(1000) ] ],
      retailPrice: [ null, [ Validators.required, Validators.pattern("^[1-9]\\d*(\\.\\d{1,2})?$") ] ],
      salePrice: [ null, [ Validators.required, Validators.pattern("^[1-9]\\d*(\\.\\d{1,2})?$") ] ],
      quentity: [ null, [ Validators.required, Validators.pattern("^[\\d]*$") ] ],
      categoryId: [ null, [ Validators.required ] ],
      manufactoredAt: [ null, [ Validators.required ] ],
      isTurmsAccepted: [ false, [ Validators.requiredTrue ] ]
    });

    this.productDetailForm.valueChanges.subscribe(value => this.validateForm());
  }

  validateForm(): void {
    Object.keys(this.productDetailForm.controls).forEach((key: string) => {
      const abstractControl = this.productDetailForm.get(key);
      this.formErrors[key] = '';

      if (abstractControl && abstractControl.valid == false && (abstractControl.touched || abstractControl.dirty || this.isFormSubmitted)) {
        const messages = this.validationMessages[key];

        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }
    });
  }

  getCategoryList(): void {
    this.categories = [];
    this._categoryService.GetAll().subscribe(response => {
      if (response && response.length > 0) {
        this.categories = response;
      }
    });
  }

  getProductDetails(): void {
    this._productService.Get(this.productId).subscribe(response => {
      if (response) {
        this.productDetailForm.patchValue(response);
        this.productDetailForm.patchValue({ isTurmsAccepted: true });
        this.selectedImagePath = `${environment.apiUrl}/${response.imageUrl}`;
      }
    });
  }

  onFileUploaded(event: any) {
    this.imageErrorList = [];
    const image = event.addedFiles[0];

    if (image) {
      let splitedName: string[] = image.name.split('.');
      let extension: string = splitedName[splitedName.length - 1];

      if (["jpg", "jpeg", "png", "webp"].includes(extension.toLocaleLowerCase()) == false) {
        this.imageErrorList.push("Product Image must be JPG, JPEG or PNG");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImagePath = reader.result as string;
      }
      reader.readAsDataURL(image);

      this.productFormData.delete("Image");
      this.productFormData.append("Image", image);
    }
  }

  removeImage(): void {
    this.productFormData.delete("Image");
    this.selectedImagePath = "";
  }

  save(): void {
    this.imageErrorList = [];
    this.isFormSubmitted = true;
    this.validateForm();

    if (!this.selectedImagePath) {
      this.imageErrorList.push("Please upload product image");
    }

    if (this.productDetailForm.invalid || this.imageErrorList.length > 0) {
      return;
    }

    this.productFormData.set("Id", this.productId.toString());
    this.productFormData.set("Title", this.productDetailForm.get("title").value);
    this.productFormData.set("SubTitle", this.productDetailForm.get("subTitle").value);
    this.productFormData.set("Description", this.productDetailForm.get("description").value);
    this.productFormData.set("RetailPrice", this.productDetailForm.get("retailPrice").value);
    this.productFormData.set("SalePrice", this.productDetailForm.get("salePrice").value);
    this.productFormData.set("Quentity", this.productDetailForm.get("quentity").value);
    this.productFormData.set("CategoryId", this.productDetailForm.get("categoryId").value);
    this.productFormData.set("ManufactoredAt", new Date(this.productDetailForm.get("manufactoredAt").value).toDateString());

    this._productService.Save(this.productFormData).subscribe(response => {
      if (response) {
        this.cancel();
      }
    });
  }

  cancel(): void {
    this.location.back();
  }

}
