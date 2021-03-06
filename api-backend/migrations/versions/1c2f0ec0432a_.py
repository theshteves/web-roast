"""empty message

Revision ID: 1c2f0ec0432a
Revises: None
Create Date: 2015-10-17 06:47:43.011659

"""

# revision identifiers, used by Alembic.
revision = '1c2f0ec0432a'
down_revision = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.create_table('sites',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('url', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('sites')
    ### end Alembic commands ###
