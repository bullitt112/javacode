package itt.certification;

public class InitializingVariables {

	 int myValue = 10;

	 static int staticField;

	 static {
	 staticField = 100;
	 }

	 static int anotherStaticField = init();

	 static int init() {
	 return staticField * 2;
	 }

	 int anotherValue;

	 {
	 anotherValue = myValue * 3;
	 }

	 int myValue2 = initializMyValue();

	 final int initializMyValue() {
	 return anotherValue + 10;
	 }

	}
