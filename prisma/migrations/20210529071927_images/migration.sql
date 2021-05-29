-- CreateTable
CREATE TABLE "ProductImage" (
    "objectName" TEXT NOT NULL DEFAULT E'',
    "productId" TEXT,

    PRIMARY KEY ("objectName")
);

-- AddForeignKey
ALTER TABLE "ProductImage" ADD FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
