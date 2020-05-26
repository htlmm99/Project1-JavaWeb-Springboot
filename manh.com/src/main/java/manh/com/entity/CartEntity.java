package manh.com.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "Cart")
public class CartEntity extends AbstractEntity {

	@ManyToOne
	@JoinColumn(name = "Product")
	private ProductEntity Product;
	@ManyToOne
	@JoinColumn(name = "Bill")
	private BillEntity Bill;
	@Column(name = "amount")
	private int amount;
	@Column(name = "total")
	private int total;

	public ProductEntity getProduct() {
		return Product;
	}

	public void setProduct(ProductEntity product) {
		Product = product;
	}

	public BillEntity getBill() {
		return Bill;
	}

	public void setBill(BillEntity bill) {
		Bill = bill;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

}
